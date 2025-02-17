import { Link } from "react-router-dom"
import { User } from "../../api/auth"
import { image } from "../../utils/image"

function UserFieled({ user, view }: { user: User, view: string }) {

    if (view === "table") {
        return (
            <tr key={user.ID} className="border-b">
                <td className="p-2">
                    <img src={user.Avatar || image(user.ID)} alt="" className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-2 text-nowrap">{user.Name}</td>
                <td className="p-2 text-nowrap">{user.LastName}</td>
                <td className="p-2 text-nowrap">
                    <Link to={`?id=${user?.ID}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                        Details
                    </Link>
                    <Link to={`?id=${user?.ID}&&edit=true`} className="border px-3 py-1 rounded">Edit</Link>
                </td>
            </tr>
        )
    } else if (view === "cards") {
        return (
            <div className="max-w-sm bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow">
                <div className="border-b p-4">
                    <div className="text-center">
                        <img className="h-14 w-14 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" src={user?.Avatar || image(user?.ID)} />
                        <div className="py-2">
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white">{user?.Name}</h3>
                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center text-sm">
                                {user?.LastName}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 px-2 text-sm">
                        <Link to={`?id=${user?.ID}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                            Details
                        </Link>
                        <Link to={`?id=${user?.ID}&&edit=true`} className="border px-3 py-1 rounded">
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else
        return null
}

export default UserFieled
