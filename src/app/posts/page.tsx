
import { redirect } from "next/navigation";
import CreatePost from "../ui/posts/create-post"
import { auth } from '@/auth';
import { getPosts } from '@/app/lib/actions';
import Image from 'next/image'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HeartIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'; // Import the HeartIcon component
import EditPostModall from "../components/EditPostModal";
import RemovePostBtn from "../components/RemovePostBtn";
import MyModal from "../components/MyDialog";
import MyDialog from "../components/MyDialog";
import EditPostModal from "../components/MyDialog";

export default async function PostsPage() {
    const session = await auth(); // the auth function will return the session if the user is logged in, or null if not logged in

    if(!session?.user) { // redirect user to home page if not logged in
        redirect('/');
    }

    const posts = await getPosts();
    dayjs.extend(relativeTime);

    const likeCounter = 0;

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
                    <div className="flex space-x-5">
                        <button className="bg-blue-500 rounded-md p-3 hover:bg-blue-400 focus:ring-2 flex space-x-3">
                            <HeartIcon className="h-6 w-6 text-white" /> {/* Use the HeartIcon component */}
                            <span>{likeCounter}</span>
                        </button>
                        <div className="flex space-x-2">
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