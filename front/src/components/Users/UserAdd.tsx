import React, { useState } from "react";
import { useStore_Users } from "../../store/data";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/user";
import toast from "react-hot-toast";
import { User } from "../../api/auth";
import { useData_roles } from "../../hook/data";
import { ChevronDown } from "lucide-react";

function UserAdd({ role }: { role: string | null }) {
    const [contacts, setContacts] = useState<string[]>([]);
    const [inputContact, setInputContact] = useState<string>("");

    const addContacts = () => {
        if (contacts.length >= 3) {
            toast.error("Vous ne pouvez ajouter que 3 contacts maximum.");
            return;
        }
        if (inputContact.trim()) {
            setContacts(prev => [inputContact.trim(), ...prev]);
            setInputContact(""); // Réinitialiser l'input après ajout
        }
    };

    const { data: roles } = useData_roles();
    const nav = useNavigate();
    const { reFetch } = useStore_Users();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedUser: User = {
            ID: Date.now().toString(),
            Name: formData.get("Name") as string,
            LastName: formData.get("LastName") as string,
            Email: formData.get("Email") as string,
            birthAt: formData.get("birthAt") as string,
            birthDate: formData.get("birthDate") as string,
            Contact: contacts, // Utiliser le tableau des contacts
            Post: formData.get("Post") as string,
            Role: formData.get("role") as string,
            Available: formData.get("Available") === "on",
        };

        createUser(updatedUser)
            .then(() => {
                toast.success("Utilisateur ajouté avec succès !");
                reFetch();
                nav("?");
            });

        console.log("Données soumises :", updatedUser);
    };

    return (
        <form onSubmit={submit} className="bg-white p-6 md:rounded-2xl md:shadow-2xl h-max w-full md:w-[27rem] relative">
            <Link to="?" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <AiFillCloseCircle size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-center text-gray-800">Ajouter utilisateur</h1>
            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
                <div>
                    <label className="block font-medium">Nom</label>
                    <input type="text" name="Name" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block font-medium">Prénom</label>
                    <input type="text" name="LastName" className="w-full px-3 py-2 border rounded-lg" />
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
                    <label className="block font-medium">Role</label>
                    <select name="role" id="" defaultValue={roles?.find(rl => rl.id === role)?.id}>
                        {roles?.map(rl => (
                            <option key={rl.id} value={rl.id}>{rl.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex items-center justify-between">
                    <div className="dropdown dropdown-bottom dropdown-center">
                        <div tabIndex={0} role="button" className="flex font-medium">
                            <span className="flex items-center justify-center w-4 h-4 text-xs font-bold p-1 rounded-full mr-1 bg-sky-600 text-white shadow-lg shadow-sky-400">{contacts.length}</span>
                            <span className="voir contacts">Contacts</span>
                            <ChevronDown />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] min-w-52 w-max p-2 shadow bg-slate-200">
                            {contacts.map((ct, index) => (
                                <li key={index} title="Effacer">
                                    <a>{ct}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={addContacts} type="button" className="text-sm font-bold m-1 text-orange-500 underline">
                        + ajouter
                    </button>
                </div>
                <input
                    type="text"
                    value={inputContact}
                    onChange={e => setInputContact(e.currentTarget.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Ajoutez un contact"
                />
            </div>

            <div className="mt-4">
                <label className="block font-medium">Poste</label>
                <input type="text" name="Post" className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <Link to="?" className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Annuler
                </Link>
                <button type="submit" className="text-orange-500 font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Enregistrer
                </button>
            </div>
        </form>
    );
}

export default UserAdd;
