import { AiFillCloseCircle } from "react-icons/ai"
import { User } from "../../api/auth"
import { Link } from "react-router-dom"
import { useStore_Users } from "../../store/data"
import useStorage from "../../hook/useStorage"
import { reactiveClass } from "../../utils/class"
import { activeTab, noActiveTab } from "../../pages/home/Gerant/Users/Users"
import UserInfo from "./details/UserInfo"
import UserStatistic from "./details/UserStatistic"
import UserListAcions from "./details/UserListAcions"

function UserDetails({ idQuery }: { idQuery: string | null }) {

    const {tab, setTab} = useStorage("")

    const user: User | undefined = useStore_Users(u => u.data).find(u => u.ID === idQuery)

    return (
        <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl h-max w-full md:w-[30rem] relative">
            <Link to="?" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <AiFillCloseCircle size={24} />
            </Link>
            <div className="text-muted-foreground inline-flex h-14 items-center justify-center md:gap-4 gap-2 rounded-xl p-2 mb-6">
                <button
                    onClick={() => setTab('')}
                    className={`group relative w-full flex items-center p-2
                                  transition-all duration-200 cursor-pointer
                                  ${reactiveClass('', tab, activeTab, noActiveTab)}`}
                >
                    <span className="font-medium">Info</span>
                </button>
                <button
                    onClick={() => setTab('action')}
                    className={`group relative w-full flex items-center p-2
                                  transition-all duration-200 cursor-pointer
                                  ${reactiveClass('action', tab, activeTab, noActiveTab)}`}
                >
                    <span className="font-medium">Suivie d'action</span>
                </button>
                <button
                    onClick={() => setTab('stat')}
                    className={`group relative w-full flex items-center p-2
                                  transition-all duration-200 cursor-pointer
                                  ${reactiveClass('stat', tab, activeTab, noActiveTab)}`}
                >
                    <span className="font-medium">Statistique</span>
                </button>
            </div>
            {(() => {
                switch (tab) {
                    case '':
                        return <UserInfo user={user} idQuery={idQuery}/>
                    case 'stat':
                        return <UserStatistic user={user} idQuery={idQuery}/>
                    case 'action':
                        return <UserListAcions/>
                    default:
                        break;
                }
            })()}
        </div>
    )
}

export default UserDetails
