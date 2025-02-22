import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Category } from '../../types/category';

interface CategoryFormProps {
    onSubmit: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    categories: Category[];
    initialCategory?: Category;
}

export function CategoryForm({ onSubmit, onCancel, categories, initialCategory }: CategoryFormProps) {
    const [formData, setFormData] = useState({
        name: initialCategory?.name ?? '',
        description: initialCategory?.description ?? '',
        parentId: initialCategory?.parentId ?? null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom de la catégorie
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">
                    Catégorie parente
                </label>
                <select
                    id="parentId"
                    value={formData.parentId ?? ''}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value || null })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Aucune (catégorie principale)</option>
                    {categories
                        .filter(cat => cat.id !== initialCategory?.id)
                        .map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {initialCategory ? 'Modifier' : 'Créer'} la catégorie
                </button>
            </div>
        </form>
    );
}