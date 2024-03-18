'use server'

import { revalidatePath } from 'next/cache';
import prisma from './db';
import { auth } from '@/auth';
import { writeFile, createReadStream, readFileSync } from 'fs';
import path from 'path';
import { S3Client, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
// import S3rver from 's3rver';

// new S3rver({
//     port: 5000,
//     directory: "./s3",
//     configureBuckets: [
//     {
//         name: "apextweets",
//         configs: [readFileSync("./cors.xml")],
//     }
//     ]
// }).run();

const UPLOAD_MAX_FILE_SIZE = 1000000; // 1MB

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY || ''
    }
});

// const s3Client = new S3Client({ 
//     region: process.env.AWS_REGION,
//     endpoint: "http://localhost:5000",
//     forcePathStyle: true,
//     credentials: {
//         accessKeyId: "S3RVER",
//         secretAccessKey: "S3RVER"
//     }
// });

AWS.config.update({ 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION 
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

async function uploadFileToS3(file: Buffer, fileName: string) {
    const fileBuffer = file; // useful to crop images

    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: `images/${fileName}`,
        Body: fileBuffer,
        ContentType: "image/jpg"
    }

    const command = new PutObjectCommand(params);

    try {
        const response = await s3Client.send(command);
        console.log("File uploaded succesfully:", response);
        const fileUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/images/${fileName}`;
        return fileUrl;
    } catch(error) {
        throw error;
    }
}

// CREATE
export async function createPost(formData: FormData) {
    const session = await auth();

    if(!session?.user) {
        throw new Error("You must be logged in to do this");
    }

    console.log("Creating post...");
    console.log(formData.get("content"));
    console.log(formData.get("file"));
    
    const file = formData.get("file");

    if(!formData.get("content")) {
        throw new Error("Content is required");
    }

    if(!file) {
        throw new Error("File is required");
    }

    console.log(file);

    const buffer = Buffer.from(await (file as File).arrayBuffer());
    console.log(buffer);
    const fileName = (file as File).name.replaceAll(" ", "_");
    console.log(fileName);
    const fileUrl = await uploadFileToS3(buffer, fileName);

    console.log(fileUrl);

    revalidatePath("/posts");
    return prisma.post.create({
        data: {
            userId: session.user?.id,
            fileUrl: fileUrl,
            content: formData.get("content") as string
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

//Users

export async function getUsers() {
    return prisma.user.findMany();
}

export async function followUserById(followingId: string) {
    const session = await auth();

    if(!session?.user) {
        throw new Error("You must be logged in to do this");
    }

    const followerId = session.user.id;

    try {
      // Check if the follow relationship already exists
      const existingFollow = await prisma.userFollow.findUnique({
        where: {
          followerId_followingId: {
            followerId: followerId,
            followingId: followingId,
          },
        },
      });
  
      if (existingFollow) {
        console.log("You're already following this user.");
        return; // Exit the function if the follow relationship already exists
      }
  
      // Create a new follow relationship if it doesn't exist
      const follow = await prisma.userFollow.create({
        data: {
          follower: {
            connect: { id: followerId },
          },
          following: {
            connect: { id: followingId },
          },
        },
      });
  
      console.log('Followed successfully!');
      return follow;
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

