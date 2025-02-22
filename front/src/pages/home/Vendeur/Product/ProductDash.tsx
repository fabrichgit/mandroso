import { useState } from 'react';
import { FolderTree } from 'lucide-react';
import type { Product } from '../../../../types/product';
import type { Category } from '../../../../types/category';
import { ProductForm } from '../../../../components/Product/ProductForm';
import { ProductCard } from '../../../../components/Product/ProductCard';
import { CategoryForm } from '../../../../components/Product/CategoryForm';
import { CategoryList } from '../../../../components/Product/CategoryList';
import { AiFillProduct } from 'react-icons/ai';
import FloatingActionButton from '../../../../components/Product/FloatingActionButton';

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
      <FloatingActionButton setIsCategoryFormOpen={setIsCategoryFormOpen} setIsProductFormOpen={setIsProductFormOpen}/>
      <div className="w-full sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 w-full">
          {/* Tabs */}
          <div className="flex justify-between items-center w-full border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`${
                  activeTab === 'products'
                    ? 'border-b-2 border-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Produits
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`${
                  activeTab === 'categories'
                    ? 'border-b-2 border-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Catégories
              </button>
            </nav>
            {
              activeTab === "categories" ?
              <FolderTree/>
              :
              <AiFillProduct/>
            }
          </div>

          {activeTab === 'products' ? (
            <>

              {(isProductFormOpen || editingProduct) && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
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
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    Aucun produit pour le moment. Cliquez sur "Ajouter un produit" pour en créer un.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>

              {(isCategoryFormOpen || editingCategory) && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
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

              <CategoryList
                categories={categories}
                onEdit={setEditingCategory}
                onDelete={handleDeleteCategory}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDash