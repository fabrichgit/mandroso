import { Pencil, Trash2, FolderTree } from 'lucide-react';
import type { Category } from '../../types/category';
import { RiFolderAddFill } from 'react-icons/ri';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  setIsCategoryFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CategoryList({ categories, onEdit, onDelete, setIsCategoryFormOpen }: CategoryListProps) {
  const getCategoryHierarchy = (categoryId: string | null): Category[] => {
    const result: Category[] = [];
    let currentId = categoryId;

    while (currentId) {
      const category = categories.find(c => c.id === currentId);
      if (category) {
        result.unshift(category);
        currentId = category.parentId ?? null;
      } else {
        break;
      }
    }

    return result;
  };

  const getChildCategories = (parentId: string | null): Category[] => {
    return categories.filter(category => category.parentId === parentId);
  };

  const renderCategory = (category: Category) => {
    const children = getChildCategories(category.id);

    return (
      <div key={category.id} className="border rounded-lg p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
            {category.description && (
              <p className="text-sm text-gray-500">{category.description}</p>
            )}
            {category.parentId && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <FolderTree className="h-4 w-4" />
                {getCategoryHierarchy(category.parentId).map(cat => cat.name).join(' > ')}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(category)}
              className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                if (children.length === 0 && confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                  onDelete(category.id);
                } else if (children.length > 0) {
                  alert('Impossible de supprimer une catégorie qui contient des sous-catégories.');
                }
              }}
              className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {children.length > 0 && (
          <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
            {children.map(child => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  const rootCategories = categories.filter(category => !category.parentId);

  return (
    <div className="space-y-4">
      {rootCategories.map(category => renderCategory(category))}
      {categories.length === 0 && (
        <div className="flex flex-col gap-5 items-center text-center py-12">
          <p className="text-center text-gray-500">
            Aucune catégorie. Créez votre première catégorie en cliquant sur le bouton ci-dessus.
          </p>
          <button onClick={() => setIsCategoryFormOpen(true)} className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 bg-gray-50 transition">
            <RiFolderAddFill className="text-blue-500" />
            categorie
          </button>
        </div>
      )}
    </div>
  );
}