'use server'

import { revalidatePath } from 'next/cache';
import prisma from './db';
import { auth } from '@/auth';


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

//CRUD posts
