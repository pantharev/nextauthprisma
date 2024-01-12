'use server'

import { revalidatePath } from 'next/cache';
import prisma from './db';
import { auth } from '@/auth';

// CREATE
export async function createPost(formData: FormData) {
    const session = await auth();

    if(!session?.user) {
        throw new Error("You must be logged in to do this");
    }

    console.log("Creating post...");
    console.log(formData.get("content"));
    
    revalidatePath("/posts");
    return prisma.post.create({
        data: {
            userId: session.user?.id,
            content: formData.get("content") as string,
        },
    });
}

// READ
export async function getPosts() {
    return prisma.post.findMany({
        include: {
            author: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
}

// UPDATE
export async function updatePost(id: number, formData: FormData) {
    const session = await auth();

    if(!session?.user) {
        throw new Error("You must be logged in to do this");
    }

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if(!post) {
        throw new Error("Post not found");
    }

    if(post.userId !== session.user?.id) {
        throw new Error("You must be the author of this post to do this");
    }

    revalidatePath("/posts");
    return prisma.post.update({
        where: {
            id,
        },
        data: {
            content: formData.get("content") as string,
        },
    });
}

// DELETE
export async function deletePost(id: number) {
    const session = await auth();

    if(!session?.user) {
        throw new Error("You must be logged in to do this");
    }

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if(!post) {
        throw new Error("Post not found");
    }

    if(post.userId !== session.user?.id) {
        throw new Error("You must be the author of this post to do this");
    }

    revalidatePath("/posts"); // reloads the page
    return prisma.post.delete({
        where: {
            id,
        },
    });
}

// Increment the like counter of a post given the id
export async function likePost(id: number) {
    const session = await auth();

    if(!session?.user) {
        throw new Error("You must be logged in to do this");
    }

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if(!post) {
        throw new Error("Post not found");
    }

    revalidatePath("/posts"); // reloads the page
    return prisma.post.update({
        where: {
            id,
        },
        data: {
            like_count: post.like_count + 1,
        },
    });
}

//CRUD posts

