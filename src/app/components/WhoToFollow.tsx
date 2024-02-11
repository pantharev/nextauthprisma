import { getUsers} from "../lib/actions"
import FollowUserBtn from "./FollowUserBtn";

export default async function WhoToFollow() {
    const users = await getUsers();

    return (
        <>
            <div className="rounded-md bg-gray-500 p-5 w-[250px]">
                <h1 className="font-bold text-white">Who to follow</h1>  
                <div className="">
                    <div>
                        {users.map((user) => (
                            <div key={user.id} className="flex justify-between items-center space-y-5">
                                <p>{user.name}</p>
                                <FollowUserBtn id={user.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}