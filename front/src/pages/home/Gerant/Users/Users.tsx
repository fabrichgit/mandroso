import UserFieled from "../../../../components/Users/UserFieled";
import useQuery from "../../../../hook/useQuery";
import UserDetails from "../../../../components/Users/UserDetails";
import { useStore_Users } from "../../../../store/data";
import UserEdit from "../../../../components/Users/UserEdit";
import UserAdd from "../../../../components/Users/UserAdd";
import FloatingActionButton from "../../../../components/Users/FloatingActionButton";
import RoleAdd from "../../../../components/Users/RoleAdd";
import { useData_roles } from "../../../../hook/data";
import RoleTabs from "../../../../components/Users/RoleTabs";
import { FaTable } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { reactiveClass } from "../../../../utils/class";
import useStorage from "../../../../hook/useStorage";

export const activeTab = "inline-flex text-nowrap bg-white font-bold px-4 border-b-2 border-black";
export const noActiveTab = "inline-flex text-nowrap px-4 dark:text-neutral-300";

function Users() {
    const idQuery = useQuery('id');
    const edit = useQuery('edit');
    const add = useQuery('add');
    const type = useQuery('type');
    const { data: users } = useStore_Users();
    const { data: roles } = useData_roles()

    const { tab, setTab } = useStorage<string>("", 'user');
    const { tab: view, setTab: setView } = useStorage<"cards" | "table">("cards", "view-weqkwe");

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
                    <UserEdit idQuery={idQuery} role={tab}/>
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
                    <div className="text-muted-foreground hidden md:inline-flex h-14 items-center justify-center md:gap-4 gap-2 rounded-xl p-2 mb-6">
                        <button
                            onClick={() => setTab('')}
                            className={`group relative w-full flex items-center p-2
                      transition-all duration-200 cursor-pointer
                      ${reactiveClass('', tab, activeTab, noActiveTab)}`}
                        >
                            <span className="font-medium">tous</span>
                        </button>
                        {
                            roles?.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => setTab(role.id)}
                                    className={`group relative w-full flex items-center p-2
                      transition-all duration-200 cursor-pointer
                      ${reactiveClass(role.id, tab, activeTab, noActiveTab)}`}
                                >
                                    <span className="font-medium">{role.label}</span>
                                </button>
                            ))
                        }
                    </div>
                </nav>

                <div className="flex w-max p-1 bg-neutral-100 border rounded-lg mx-2">
                    <button
                        title="voir en tant que tableau"
                        onClick={() => setView("table")}
                        className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('table', view, 'bg-white border', '')}`}
                    >
                        <FaTable />
                    </button>
                    <button
                        title="voir en tant que carte"
                        onClick={() => setView("cards")}
                        className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('cards', view, 'bg-white border', '')}`}
                    >
                        <MdOutlineDashboard />
                    </button>
                </div>
            </div>
            {view === "table" ? (
                <div className="w-full overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-2 text-left">Portrait</th>
                                <th className="p-2 text-left">Nom</th>
                                <th className="p-2 text-left">Prenom</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.filter(user => !Boolean(user.archived)).filter((user) => tab === '' ? true : (!user.archived && user.Role.toLowerCase() === tab.toLowerCase()))?.map((user) => <UserFieled user={user} view={view} key={user.ID} />)}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-wrap gap-6 w-full">
                    {users?.filter(user => !Boolean(user.archived)).filter((user) => tab === '' ? true : (!user.archived && user.Role.toLowerCase() === tab.toLowerCase()))?.map((user) => <UserFieled user={user} view={view} key={user.ID} />)}
                </div>
            )}
        </div>

    )
}

export default Users