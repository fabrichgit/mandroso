import { Link } from "react-router-dom"
import { User } from "../../api/auth"
import { image } from "../../utils/image"

function UserFieled({ user }: { user: User }) {

    return (
        <div className="max-w-sm bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow">
            <div className="border-b p-4">
                <div className="text-center">
                    <img className="h-14 w-14 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" src={user?.Avatar || image(user?.ID)} />
                    <div className="py-2">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-white">{user?.Name}</h3>
                        <div className="inline-flex text-gray-700 dark:text-gray-300 items-center text-sm">
                            {user?.Email}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 px-2 text-sm">
                    <Link to={`?id=${user?.ID}`} className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4  py-1">
                        Details
                    </Link>
                    <Link to={`?id=${user?.ID}&&edit=true`} className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-1">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserFieled
