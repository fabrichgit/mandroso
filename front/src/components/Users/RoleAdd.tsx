import { Link, useNavigate } from "react-router-dom";
import { useData_operations, useData_roles } from "../../hook/data";
import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";

function RoleAdd() {

    const nav = useNavigate();
    const {add} = useData_roles()
    const ops = useData_operations()
    let operations: {id: string, label: string}[] = [];
    let title = ""

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {id, label} = JSON.parse(e.currentTarget.name)

        const found = operations.find(op => op.id === id)

        if (found) {
            operations = operations.filter(op => op.id !== id)
        }else{
            operations.push({id, label})
        }
    }

    const submit = async () => {
        if(!title || !operations)
            return;
        // roles.setState(prv => [{id: Date.now().toString(), label: title, operations} , ...prv]);
        add({id: Date.now().toString(), label: title, operations})
        nav('?')
    }

    return (
        <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl h-max w-full md:w-[27rem] relative">
            <Link to="?" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <AiFillCloseCircle size={24} />
            </Link>
            <div>
                <label className="block font-medium mb-2">Nom de la role :</label>
                <input onChange={e => {
                    title = e.currentTarget.value
                }} maxLength={15} type="text" name="role" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex flex-col gap-3 mt-6">
                {
                    ops?.map(op => (
                        <div key={op.id} className="flex items-center">
                            <input name={JSON.stringify(op)} type="checkbox" onChange={handleChange}/>
                            <label className="font-medium ml-2">{op.label}</label>
                        </div>
                    ))
                }
            </div>
            <div className="mt-6 flex justify-center gap-4">
                <Link to="?" className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Annuler
                </Link>
                <button onClick={submit} type="button" className="text-orange-500 font-semibold py-2 px-6 rounded-lg shadow-lg">
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

export default RoleAdd;