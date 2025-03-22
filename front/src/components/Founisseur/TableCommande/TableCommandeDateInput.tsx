import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { TableCommande } from '../../../store/useTableCommandeStore';

interface Props {
    onSubmit: (date: string | Date) => void;
    initialData?: TableCommande;
    isEditing?: boolean;
}

export function TableCommandeDateInput({ onSubmit, isEditing = false }: Props) {

    const [date, setDate] = useState<string | Date>(new Date());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(date)

        if (!isEditing) {
            setDate(new Date());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Modifier ...' : '+ Nouveau'}
            </h2>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-12 items-center pb-4">
                    <div>
                        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input type="date" onChange={(e) => setDate(e.target.value)} className="md:mt-1 block mb-5 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm w-max"/>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex w-max items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        {isEditing ? (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4 mr-2" />
                                Commander
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}