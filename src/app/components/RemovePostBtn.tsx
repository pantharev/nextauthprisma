'use client'

import { TrashIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react"
import { deletePost } from "../lib/actions"

export default function RemovePostBtn({ id }: { id: number }) {
    
    const deletePostById = deletePost.bind(null, id);

    useEffect(() => {
        console.log(id)
    }, [])

    return (
        <form action={deletePostById}>
            <button type="submit" className="bg-red-500 rounded-md p-3 text-black">
                <TrashIcon className="h-6 w-6 text-black" /> {/* Use the TrashIcon component */}
            </button>
        </form>
    )
}