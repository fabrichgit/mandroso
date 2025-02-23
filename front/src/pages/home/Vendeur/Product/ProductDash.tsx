import { useState } from 'react';
import { FolderTree, Maximize } from 'lucide-react';
import type { Product } from '../../../../types/product';
import type { Category } from '../../../../types/category';
import { ProductForm } from '../../../../components/Product/ProductForm';
import { ProductCard } from '../../../../components/Product/ProductCard';
import { CategoryForm } from '../../../../components/Product/CategoryForm';
import { CategoryList } from '../../../../components/Product/CategoryList';
import { AiFillCloseCircle, AiFillProduct } from 'react-icons/ai';
import FloatingActionButton from '../../../../components/Product/FloatingActionButton';
import resize from '../../../../utils/maximise';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

function ProductDash() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  const handleCreateProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProducts([...products, newProduct]);
    setIsProductFormOpen(false);
  };

  const handleUpdateProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...productData,
      id: editingProduct.id,
      createdAt: editingProduct.createdAt,
      updatedAt: new Date(),
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleCreateCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCategories([...categories, newCategory]);
    setIsCategoryFormOpen(false);
  };

  const handleUpdateCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingCategory) return;

    const updatedCategory: Category = {
      ...categoryData,
      id: editingCategory.id,
      createdAt: editingCategory.createdAt,
      updatedAt: new Date(),
    };

    setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    const hasProducts = products.some(product => product.category === id);
    if (hasProducts) {
      alert('Impossible de supprimer une catégorie qui contient des produits.');
      return;
    }
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="w-full">
      <FloatingActionButton setIsCategoryFormOpen={setIsCategoryFormOpen} setIsProductFormOpen={setIsProductFormOpen} />
      <div className="w-full sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 w-full">
          <div className="flex items-center mb-6">
            <MdOutlineProductionQuantityLimits className="h-5 w-5 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Gestion des Produits
            </h1>
          </div>
          {/* Tabs */}
          <div className="flex justify-between items-center w-full border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`${activeTab === 'products'
                  ? 'border-b-2 border-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Produits
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`${activeTab === 'categories'
                  ? 'border-b-2 border-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Catégories
              </button>
            </nav>
            {
              activeTab === "categories" ?
                <FolderTree />
                :
                <AiFillProduct />
            }
          </div>

          {(isProductFormOpen || editingProduct) && (
            <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
              <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
                <button onClick={() => setIsProductFormOpen(false)} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                  <AiFillCloseCircle size={24} />
                </button>
                <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
                  <Maximize size={24} />
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                </h2>
                <ProductForm
                  onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                  onCancel={() => {
                    setIsProductFormOpen(false);
                    setEditingProduct(null);
                  }}
                  initialProduct={editingProduct ?? undefined}
                  categories={categories}
                />
              </div>
            </div>
          )}


          {(isCategoryFormOpen || editingCategory) && (
            <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
              <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
                <button onClick={() => setIsCategoryFormOpen(false)} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                  <AiFillCloseCircle size={24} />
                </button>
                <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
                  <Maximize size={24} />
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editingCategory ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie'}
                </h2>
                <CategoryForm
                  onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
                  onCancel={() => {
                    setIsCategoryFormOpen(false);
                    setEditingCategory(null);
                  }}
                  initialCategory={editingCategory ?? undefined}
                  categories={categories}
                />
              </div>
            </div>
          )}

          {activeTab === 'products' ? (
            <>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products?.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categorie={categories?.find(cg => cg.id === product.category)?.name}
                    onEdit={setEditingProduct}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>

              {products.length === 0 && (
                <div className="flex flex-col gap-5 items-center text-center py-12">
                  <p className="text-gray-500">
                    Aucun produit pour le moment.
                  </p>
                  <button onClick={() => setIsProductFormOpen(true)} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 bg-gray-50 transition">
                    <HiOutlineViewGridAdd className="text-orange-500" />
                    nouveau produit
                  </button>
                </div>
              )}
            </>
          ) : (
            <>

              <CategoryList
                categories={categories}
                onEdit={setEditingCategory}
                onDelete={handleDeleteCategory}
                setIsCategoryFormOpen={setIsCategoryFormOpen}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDash