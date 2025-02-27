import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Product } from '../../types/product';
import type { Category } from '../../types/category';
import { AiFillCloseCircle } from 'react-icons/ai';
import AutocompleteInput from '../ui/AutocompleteInput';
import { useLocalStore } from '../../store/useLocal';

interface ProductFormProps {
    onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    initialProduct?: Product;
    categories: Category[];
}

export function ProductForm({ onSubmit, onCancel, initialProduct, categories }: ProductFormProps) {
    const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt" | "updatedAt">>({
        reference: initialProduct?.reference ?? '',
        name: initialProduct?.name ?? '',
        category: initialProduct?.category ?? '',
        brand: initialProduct?.brand ?? '',
        description: initialProduct?.description ?? '',
        dimensions: initialProduct?.dimensions ?? '',
        weight: initialProduct?.weight ?? 0,
        color: initialProduct?.color ?? '',
        materials: initialProduct?.materials ?? [],
        local: initialProduct?.local ?? [],
        volume: initialProduct?.volume ?? 0,
        quantity: initialProduct?.quantity ?? 0,
        condition: initialProduct?.condition ?? 'neuf',
        images: initialProduct?.images ?? []
    });

    const [newMaterial, setNewMaterial] = useState('');
    const [newLocal, setNewLocal] = useState('');
    const [newPhoto, setNewPhoto] = useState('');

    const { add, local } = useLocalStore()


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleAddLocal = () => {
        if (newLocal.trim()) {
            setFormData({
                ...formData,
                local: [newLocal.trim(), ...(formData.local || [])]
            });
            setNewLocal('');
        }
    };

    const handleAddMaterial = () => {
        if (newMaterial.trim()) {
            setFormData({
                ...formData,
                materials: [...formData.materials, newMaterial.trim()]
            });
            setNewMaterial('');
        }
    };

    const handleAddPhoto = () => {
        if (newPhoto.trim() && (formData.images || [])?.length <= 7) {
            setFormData({
                ...formData,
                images: [...(formData.images || []), newPhoto.trim()]
            });
            setNewPhoto('');
        }
    };


    const handleRemoveMaterial = (index: number) => {
        setFormData({
            ...formData,
            materials: formData.materials.filter((_, i) => i !== index)
        });
    };

    const handleRemovePhoto = (index: number) => {
        setFormData({
            ...formData,
            images: formData.images?.filter((_, i) => i !== index)
        });
    };

    const handleRemoveLocal = (index: number) => {
        setFormData({
            ...formData,
            local: formData.local?.filter((_, i) => i !== index)
        });
    };

    const getCategoryHierarchy = (categoryId: string): string => {
        const result: string[] = [];
        let currentCategory = categories.find(c => c.id === categoryId);

        while (currentCategory) {
            result.unshift(currentCategory.name);
            currentCategory = currentCategory.parentId ? categories.find(c => c.id === currentCategory?.parentId) : undefined;
        }

        return result.join(' > ');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Informations générales */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Informations générales</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                            Référence
                        </label>
                        <input
                            type="text"
                            id="reference"
                            value={formData.reference}
                            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom du produit
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Catégorie
                        </label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {getCategoryHierarchy(category.id)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                            Marque
                        </label>
                        <input
                            type="text"
                            id="brand"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
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
                    <label htmlFor="emplacement" className="block text-sm font-medium text-gray-700">
                        Emplacement
                    </label>
                    <AutocompleteInput initialSuggestions={local} onAddSuggestion={(local) => {
                        add(local);
                        handleAddLocal();
                    }} onChange={(local) => setNewLocal(local)} placeholder='' value={newLocal} />
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.local?.map((lc, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-orange-100 text-orange-800"
                            >
                                {lc}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveLocal(index)}
                                    className="ml-1 inline-flex items-center p-0.5 rounded-full text-orange-400 hover:bg-orange-200 hover:text-orange-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Caractéristiques techniques */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Caractéristiques techniques</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                            Dimensions
                        </label>
                        <input
                            type="text"
                            id="dimensions"
                            value={formData.dimensions}
                            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                            placeholder="ex: 20 x 10 x 5 cm"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantite
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                            step="1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                            Poids (kg)
                        </label>
                        <input
                            type="number"
                            id="weight"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                            step="0.1"
                        />
                    </div>
                    <div>
                        <label htmlFor="volume" className="block text-sm font-medium text-gray-700">
                            Volume (m³)
                        </label>
                        <input
                            type="number"
                            id="volume"
                            value={formData.volume}
                            onChange={(e) => setFormData({ ...formData, volume: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                            step="0.001"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Couleur
                        </label>
                        <input
                            type="text"
                            id="color"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Prix unitaire
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Matériaux
                    </label>
                    <div className="mt-1 flex gap-2">
                        <input
                            type="text"
                            value={newMaterial}
                            onChange={(e) => setNewMaterial(e.target.value)}
                            placeholder="Ajouter un matériau"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddMaterial();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddMaterial}
                            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-600"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.materials.map((material, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                {material}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMaterial(index)}
                                    className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Photos
                    </label>
                    <div className="mt-1 flex gap-2">
                        <input
                            type="url"
                            value={newPhoto}
                            onChange={(e) => setNewPhoto(e.target.value)}
                            placeholder="Insérer un lien"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddPhoto();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddPhoto}
                            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-600"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="mt-2 flex flex-nowrap gap-2 w-full overflow-x-auto">
                        {formData.images?.map((img, index) => (
                            <div
                                key={index}
                                className="relative min-w-24 h-24 rounded-md px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 overflow-hidden"
                            >
                                <img src={img} alt="" className='w-full h-full' />
                                {/* <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                    className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                                >
                                    <X className="h-3 w-3" />
                                </button> */}
                                <button type='button' onClick={() => handleRemovePhoto(index)} className="absolute top-1 right-1 text-gray-500 hover:text-gray-800">
                                    <AiFillCloseCircle className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                        État
                    </label>
                    <select
                        id="condition"
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value as Product['condition'] })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="neuf">Neuf</option>
                        <option value="usagé">Usagé</option>
                        <option value="reconditionné">Reconditionné</option>
                    </select>
                </div>
            </div>

            {/* Actions du formulaire */}
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
                    {initialProduct ? 'Modifier' : 'Créer'} le produit
                </button>
            </div>
        </form>
    );
}