import React from "react";
import { useStore_Users } from "../../store/data";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../api/user";
import toast from "react-hot-toast";
import { FaArchive } from "react-icons/fa";

function UserEdit({ idQuery }: { idQuery: string | null }) {

    const nav = useNavigate()
    const { data: users, reFetch } = useStore_Users();
    const user = users ? users?.find(u => u.ID === idQuery) : null

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedUser = {
            Name: formData.get("Name") as string,
            LastName: formData.get("LastName") as string,
            Email: formData.get("Email") as string,
            birthAt: formData.get("birthAt") as string,
            birthDate: formData.get("birthDate") as string,
            Contact: formData.get("Contact") as string,
            Post: formData.get("Post") as string,
            Role: formData.get("Role") as string,
            Available: formData.get("Available") === "on",
        };

        if (idQuery) {
            updateUser({ data: updatedUser }, idQuery)
                .then(() => {
                    toast.success('success !')
                    reFetch()
                    nav('?')
                })
        }

        console.log("Données soumises :", updatedUser);

    }

    const archiver = (archived?: boolean) => {
        if (idQuery) {
            updateUser({ data: { archived } }, idQuery)
                .then(() => {
                    toast.success('archived !')
                    reFetch()
                    nav('?')
                })
        }
    }

    return (
        <form onSubmit={submit} className="bg-white p-6 md:rounded-2xl md:shadow-2xl h-max w-full md:w-[27rem] relative">
            <Link to="?" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <AiFillCloseCircle size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-center text-gray-800">Modifier les informations</h1>
            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
                <div>
                    <label className="block font-medium">Nom</label>
                    <input type="text" name="Name" defaultValue={user?.Name} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Prenom</label>
                    <input type="text" name="LastName" defaultValue={user?.LastName} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input type="email" name="Email" defaultValue={user?.Email} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Lieu de naissance</label>
                    <input type="text" name="birthAt" defaultValue={user?.birthAt} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Date de naissance</label>
                    <input type="date" name="birthDate" defaultValue={user?.birthDate} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Contact</label>
                    <input type="text" name="Contact" defaultValue={user?.Contact} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Poste</label>
                    <input type="text" name="Post" defaultValue={user?.Post} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Rôle</label>
                    <input type="text" name="Role" defaultValue={user?.Role} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="Available" defaultChecked={user?.Available} />
                    <label className="font-medium">Activer/Desactiver</label>
                </div>
                <button onClick={() => archiver(!Boolean(user?.archived))} className="flex items-center gap-2 w-max">
                    <FaArchive className="text-red-500" />
                    <span className="font-medium">Archiver</span>
                </button>
            </div>
            <div className="mt-6 flex justify-center gap-4">
                <Link to={`?id=${idQuery}`} className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Annuler
                </Link>
                <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Enregistrer
                </button>
            </div>
        </form>
    )
}

export default UserEdit
