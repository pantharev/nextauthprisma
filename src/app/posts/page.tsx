
import { redirect } from "next/navigation";
import CreatePost from "../ui/posts/create-post"
import { auth } from '@/auth';
import { getPosts } from '@/app/lib/actions';
import Image from 'next/image'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RemovePostBtn from "../components/RemovePostBtn";
import EditPostModal from "../components/EditPostModal";
import LikePostBtn from "../components/LikePostBtn";

export default async function PostsPage() {
    const session = await auth(); // the auth function will return the session if the user is logged in, or null if not logged in

    if(!session?.user) { // redirect user to home page if not logged in
        redirect('/');
    }

    const posts = await getPosts();
    dayjs.extend(relativeTime);

    const likeCounter = 0;

    return (
        <main className="px-4 sm:p-24 min-h-screen w-full mx-auto">
            <CreatePost />
            <ul className="flex flex-col justify-center items-center mt-5">
            {posts.map((post) => (
                <li key={post.id} className="border border-b-slate-400 p-4 max-w-lg mx-auto w-full my-2">
                    <Image src={post?.author?.image || ''} width={50} height={50} className="rounded-full" alt="Picture of the github user" />
                    <div className="flex-grow">
                        <p>{post.content}</p>
                        <p>{post.author.name}</p>
                        <p>{dayjs(post.createdAt).fromNow()}</p>
                    </div>
                    <div className="flex space-x-5 justify-between mt-5">
                        <div className="">
                            <LikePostBtn id={post.id} likeCount={post.like_count} />
                        </div>
                        <div className="flex space-x-2 items-center mr-5">
                            <EditPostModal id={post.id} content={post.content} />
                            <RemovePostBtn id={post.id}/>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        </main>
    )
}