'use client'

import { TrashIcon, HeartIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react"
import { deletePost, likePost } from "../lib/actions"

export default function LikePostBtn({ id, likeCount }: { id: number, likeCount: number }) {
    
    const likePostById = likePost.bind(null, id);

    useEffect(() => {
        console.log(id)
    }, [])

    return (
        <form action={likePostById}>
            <button type="submit" className="bg-blue-500 rounded-md p-3 text-black">
                <HeartIcon className="h-6 w-6 text-white" /> {/* Use the HeartIcon component */}
                <span className="text-white">{likeCount}</span>
            </button>
        </form>
    )
}