// create a GET endpoint in nextjs

import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function GET(req: NextApiRequest) {
    const todos = await prisma.todo.findMany();
    console.log(todos);

    return new NextResponse(JSON.stringify(todos), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 200
    });
}

export async function POST(req: NextApiRequest) {
    const todos = await prisma.todo.createMany({
        data: [
            { title: 'Buy Groceries', completed: false },
            { title: 'Code Next.js',  completed: false },
            { title: 'Learn Prisma',  completed: false },
            { title: 'Make Dinner',   completed: false },
            { title: 'Do Excercise',  completed: false },
        ],
        skipDuplicates: true
    });
    console.log(todos);
    return new NextResponse("Succesfully created new todos \n: " + JSON.stringify(todos), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 201
    });
}