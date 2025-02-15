import React from "react";
import { useStore_Users } from "../../store/data";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/user";
import toast from "react-hot-toast";
import { User } from "../../api/auth";

function UserAdd({ role }: { role: string | null }) {

    const nav = useNavigate()
    const { reFetch } = useStore_Users();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedUser : User = {
            ID: Date.now().toString(),
            Name: formData.get("Name") as string,
            Email: formData.get("Email") as string,
            birthAt: formData.get("birthAt") as string,
            birthDate: formData.get("birthDate") as string,
            Contact: formData.get("Contact") as string,
            Post: formData.get("Post") as string,
            Role: role?.toLowerCase() || "",
            Available: formData.get("Available") === "on",
        };

        createUser(updatedUser)
            .then(() => {
                toast.success('success !')
                reFetch()
                nav('?')
            })

        console.log("Données soumises :", updatedUser);

    }

    return (
        <form onSubmit={submit} className="bg-white p-6 md:rounded-2xl md:shadow-2xl h-max w-full md:w-[27rem] relative">
            <Link to="?" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <AiFillCloseCircle size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-center text-gray-800">Ajouter un(e) {role}</h1>
            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
                <div>
                    <label className="block font-medium">Nom</label>
                    <input type="text" name="Name" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input type="email" name="Email" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Lieu de naissance</label>
                    <input type="text" name="birthAt" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Date de naissance</label>
                    <input type="date" name="birthDate" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Contact</label>
                    <input type="text" name="Contact" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Poste</label>
                    <input type="text" name="Post" className="w-full px-3 py-2 border rounded-lg" />
                </div>
            </div>
            <div className="mt-6 flex justify-center gap-4">
                <Link to="?" className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Annuler
                </Link>
                <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Enregistrer
                </button>
            </div>
        </form>
    )
}

export default UserAdd
