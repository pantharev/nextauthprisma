
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
import WhoToFollow from "../components/WhoToFollow";

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
            <div className="flex justify-between mx-5 items-start w-[1000px]">
                <div>
                    <CreatePost />
                    <ul className="flex flex-col justify-center items-start mt-5 space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="border border-b-slate-400 p-4 max-w-lg mx-auto w-full my-4 shadow-sm rounded-lg">
                            <div className="flex w-full items-start space-x-5">
                                <Image src={post?.author?.image || ''} width={50} height={50} className="rounded-full" alt="Picture of the github user" />
                                <div>
                                    <div className="flex space-x-2 items-center">
                                        <p className="text-sm text-gray-500">{post.author.email?.split("@")[0]}</p>
                                        <div className="w-2"><span className="unset">.</span></div>
                                        <p className="mt-2">{dayjs(post.createdAt).fromNow()}</p>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{post.content}</p>
                                    </div>
                                    <div className="flex space-x-5 justify-between mt-5">
                                        <LikePostBtn id={post.id} likeCount={post.like_count} />
                                        <div className="flex space-x-2 items-center mr-5">
                                            <EditPostModal id={post.id} content={post.content} />
                                            <RemovePostBtn id={post.id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="sticky top-0">
                    <div>
                        <input type="text" placeholder="search" />
                    </div>
                    <WhoToFollow />
                </div>
            </div>
        </main>
    )
}