import { followUserById } from "../lib/actions"

export default function FollowUserBtn({ id }: { id: string }) {
        const followUser = followUserById.bind(null, id);
    
        return (
            <form action={followUser}>
                <button type="submit" className="rounded-md p-2 text-black bg-slate-200 hover:bg-slate-300">Follow</button>
            </form>
        )
}
