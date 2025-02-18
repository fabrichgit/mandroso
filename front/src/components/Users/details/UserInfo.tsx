import { Link } from "react-router-dom"
import { User } from "../../../api/auth"
import { FaEdit } from "react-icons/fa"

function UserInfo({user, idQuery}: {user?: User, idQuery: string | null}) {
    return (
        <>
            <div className="mt-6 space-y-3 text-gray-700">
                <p><strong>Nom:</strong> {user?.Name}</p>
                <p><strong>Prenom:</strong> {user?.LastName}</p>
                <p><strong>Email:</strong> {user?.Email}</p>
                <p><strong>Disponible:</strong> <span className={`px-2 py-1 rounded-md text-white ${user?.Available ? "bg-green-500" : "bg-red-500"}`}>{user?.Available ? "Oui" : "Non"}</span></p>
                <p><strong>Lieu de naissance:</strong> {user?.birthAt}</p>
                <p><strong>Date de naissance:</strong> {user?.birthDate}</p>
                <p><strong>Contact:</strong> {user?.Contact}</p>
                <p><strong>Poste:</strong> {user?.Post || "Non renseigné"}</p>
                <p><strong>Rôle:</strong> {user?.Role}</p>
                <p><strong>Rôle:</strong> {user?.Role}</p>
            </div>
            <div className="mt-6 flex justify-center">
                <Link to={`?id=${idQuery}&&edit=true`} className="flex items-center" >
                    <FaEdit />
                    <span className="">
                        editer
                    </span>
                </Link>
            </div>
        </>
    )
}

export default UserInfo
