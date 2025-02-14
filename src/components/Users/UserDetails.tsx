import { AiFillCloseCircle } from "react-icons/ai"
import { User } from "../../api/auth"
import { Link } from "react-router-dom"

// @ts-ignore
function UserDetails({ idQuery, edit }: { idQuery: string | null, edit: string | null }) {

    const user: User = JSON.parse(localStorage.getItem('users') || "[]").find((u: User) => u.ID === idQuery)

    return (
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative">
            <Link to="?" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <AiFillCloseCircle size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-center text-gray-800">Détails de l'utilisateur</h1>
            <div className="mt-6 space-y-3 text-gray-700">
                <p><strong>Nom:</strong> {user.Name}</p>
                <p><strong>Email:</strong> {user.Email}</p>
                <p><strong>Disponible:</strong> <span className={`px-2 py-1 rounded-md text-white ${user.Available ? "bg-green-500" : "bg-red-500"}`}>{user.Available ? "Oui" : "Non"}</span></p>
                <p><strong>Lieu de naissance:</strong> {user.birthAt}</p>
                <p><strong>Date de naissance:</strong> {user.birthDate}</p>
                <p><strong>Contact:</strong> {user.Contact}</p>
                <p><strong>Poste:</strong> {user.Post || "Non renseigné"}</p>
                <p><strong>Rôle:</strong> {user.Role}</p>
            </div>
            <div className="mt-6 flex justify-center">
                <Link to={`?id=${idQuery}&&edit=true`} className="bg-blue-600 p-1 rounded-lg shadow-lg" >
                    <span className="block bg-white py-1 px-6 rounded-lg">
                        editer
                    </span>
                </Link>
            </div>
        </div>

    )
}

export default UserDetails
