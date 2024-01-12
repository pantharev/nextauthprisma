
import { createPost } from "@/app/lib/actions"

export default async function CreatePost() {

    return (
        <section className="flex flex-col items-center gap-y-5">
            <h1 className="underline text-xl">Posts</h1>
            <form action={createPost} className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-3">
                    <label htmlFor="content">Create a Post</label>
                    <textarea name="content" placeholder="What is happening?!" className="text-black"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 rounded-md p-3 hover:bg-blue-400 focus:ring-2">Post</button>
            </form>
        </section>
    )
}