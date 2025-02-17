import { useState } from "react";
import UserFieled from "../../../../components/Users/UserFieled";
import useQuery from "../../../../hook/useQuery";
import UserDetails from "../../../../components/Users/UserDetails";
import { useStore_Users } from "../../../../store/data";
import UserEdit from "../../../../components/Users/UserEdit";
import UserAdd from "../../../../components/Users/UserAdd";
import FloatingActionButton from "../../../../components/FloatingActionButton";
import RoleAdd from "../../../../components/Users/RoleAdd";
import { useData_roles } from "../../../../hook/data";
import RoleTabs from "../../../../components/Users/RoleTabs";
import { Link } from "react-router-dom";
import { FaTable } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

const activeTab = "inline-flex text-nowrap bg-white px-4 rounded-lg shadow dark:bg-gradient-to-br dark:text-neutral-300 dark:from-gray-800 dark:to-gray-700";
const noActiveTab = "inline-flex text-nowrap px-4 dark:text-neutral-300";

function Users() {
    const idQuery = useQuery('id');
    const edit = useQuery('edit');
    const add = useQuery('add');
    const type = useQuery('type');
    const [tab, setTab] = useState("Gerant");
    const { data: users } = useStore_Users();
    const { data: roles } = useData_roles()
    const view = useQuery("view") || "cards";

    if (add && type === "user") {
        return (
            <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
                <UserAdd role={tab} />
            </div>
        )
    }

    if (add && type === "role") {
        return (
            <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
                <RoleAdd />
            </div>
        )
    }

    if (idQuery) {
        if (edit === "true") {
            return (
                <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
                    <UserEdit idQuery={idQuery} />
                </div>
            )
        }
        return (
            <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
                <UserDetails idQuery={idQuery} />
            </div>
        )
    }

    return (
        <div className="w-full">
            <FloatingActionButton />
            <div className="flex justify-between items-center w-full">
                <nav className="w-full">
                    <div className="block md:hidden w-full p-3">
                        <RoleTabs roles={roles} setTab={setTab} />
                    </div>
                    <div className="text-muted-foreground hidden md:inline-flex h-14 items-center justify-center md:gap-4 gap-2 rounded-xl bg-neutral-50 dark:bg-gray-800 dark:border dark:border-gray-700 p-2 mb-6">
                        {
                            roles?.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => setTab(role.label)}
                                    className={`group relative w-full flex items-center p-2
                      transition-all duration-200 cursor-pointer
                      ${tab === role.label ? activeTab : noActiveTab}`}
                                >
                                    <span className="font-medium">{role.label}</span>
                                </button>
                            ))
                        }
                    </div>
                </nav>

                <div className="flex w-max px-4">
                    {view === "cards" ?
                        <Link
                            title="voir en tant que tableau"
                            to="?view=table"
                            className="h-max mr-2 px-4 py-2 bg-gray-200 rounded"
                        >
                            <FaTable />
                        </Link>
                        :
                        <Link
                            title="voir en tant que carte"
                            to="?view=cards"
                            className="h-max px-4 py-2 bg-gray-200 rounded"
                        >
                            <MdOutlineDashboard />
                        </Link>}
                </div>
            </div>
            {view === "table" ? (
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-2 text-left">Avatar</th>
                            <th className="p-2 text-left">Nom</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.filter((user) => !user.archived && user.Role.toLowerCase() === tab.toLowerCase())?.map((user) => <UserFieled user={user} view={view} key={user.ID} />)}
                    </tbody>
                </table>
            ) : (
                <div className="flex flex-wrap gap-6 w-full">
                    {users?.filter((user) => !user.archived && user.Role.toLowerCase() === tab.toLowerCase())?.map((user) => <UserFieled user={user} view={view} key={user.ID} />)}
                </div>
            )}
        </div>

    )
}

export default Users