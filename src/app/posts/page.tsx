
import { redirect } from "next/navigation";
import CreatePost from "../ui/posts/create-post"
import { auth } from '@/auth';
import { getPosts } from '@/app/lib/actions';
import Image from 'next/image'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


export default async function PostsPage() {

    const session = await auth(); // the auth function will return the session if the user is logged in, or null if not logged in

    if(!session?.user) { // redirect user to home page if not logged in
        redirect('/');
    }

    const posts = await getPosts();
    dayjs.extend(relativeTime);

    return (
        <main className="p-24 min-h-screen w-[622px] mx-auto">
            <CreatePost />
            <ul className="flex flex-col justify-center items-center mt-5">
            {posts.map((post) => (
                <li key={post.id} className="border border-b-slate-400 p-4">
                    <Image src={post?.author?.image} width={50} height={50} className="rounded-[50%]" alt="Picture of the github user" />
                    <p>{post.content}</p>
                    <p>{post.author.name}</p>
                    <p>{dayjs(post.createdAt).fromNow()}</p>
                </li>
            ))}
            </ul>
        </main>
    )
}