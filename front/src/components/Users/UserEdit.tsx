import React, { useState } from "react";
import { useStore_Users } from "../../store/data";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../api/user";
import toast from "react-hot-toast";
import { FaArchive } from "react-icons/fa";
import { useData_roles } from "../../hook/data";
import { ChevronDown, Maximize, Trash } from "lucide-react";
import resize from "../../utils/maximise";

function UserEdit({ idQuery, role }: { idQuery: string | null, role: string | null }) {

    const nav = useNavigate()
    const { data: users, reFetch } = useStore_Users();
    const user = users ? users?.find(u => u.ID === idQuery) : null;
    const { data: roles } = useData_roles()

    const [contacts, setContacts] = useState<string[]>(user?.Contact || []);
    const [inputContact, setInputContact] = useState<string>("");

    // Ajouter un contact
    const addContacts = () => {
        if (contacts.length >= 3) {
            toast.error("Vous ne pouvez ajouter que 3 contacts maximum.");
            return;
        }
        if (inputContact.trim() && !contacts.includes(inputContact.trim())) {
            setContacts(prev => [inputContact.trim(), ...prev]);
            setInputContact("");
        }
    };

    // Supprimer un contact
    const removeContact = (contact: string) => {
        setContacts(prev => prev.filter(c => c !== contact));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedUser = {
            Name: formData.get("Name") as string,
            LastName: formData.get("LastName") as string,
            Email: formData.get("Email") as string,
            birthAt: formData.get("birthAt") as string,
            birthDate: formData.get("birthDate") as string,
            Contact: contacts,
            Post: formData.get("Post") as string,
            Role: formData.get("role") as string,
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
        <form onSubmit={submit} className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
            <Link to="?" className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                <AiFillCloseCircle size={24} />
            </Link>
            <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
                <Maximize size={24} />
            </button>
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
                    <label className="block font-medium">Role</label>
                    <select name="role" id="" defaultValue={roles?.find(rl => rl.id === role)?.id}>
                        {
                            roles?.map(rl => (
                                <option value={rl.id}>{rl.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label className="block font-medium">Poste</label>
                    <input type="text" name="Post" defaultValue={user?.Post} className="w-full px-3 py-2 border rounded-lg" />
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
                                <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                                    <span>{ct}</span>
                                    <button type="button" onClick={() => removeContact(ct)} className="inline w-max text-red-500 hover:text-red-700">
                                        <Trash size={16} />
                                    </button>
                                </div>
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

            <div className="mt-6 flex justify-center gap-4">
                <Link to={`?id=${idQuery}`} className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Annuler
                </Link>
                <button type="submit" className="text-orange-500 font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Enregistrer
                </button>
            </div>
        </form>
    )
}

export default UserEdit
