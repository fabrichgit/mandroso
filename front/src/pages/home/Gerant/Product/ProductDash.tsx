import { useEffect, useState } from 'react';
import { FolderTree, Maximize, Plus } from 'lucide-react';
import type { Product } from '../../../../types/product';
import type { Category } from '../../../../types/category';
import { ProductForm } from '../../../../components/Product/ProductForm';
import { ProductCard } from '../../../../components/Product/ProductCard';
import { CategoryForm } from '../../../../components/Product/CategoryForm';
import { CategoryList } from '../../../../components/Product/CategoryList';
import { AiFillCloseCircle } from 'react-icons/ai';
import FloatingActionButton from '../../../../components/Product/FloatingActionButton';
import resize from '../../../../utils/maximise';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useFetchProducts, useProductStore } from '../../../../store/useProductStore';
import useStorage from '../../../../hook/useStorage';
import TableProductList from '../../../../components/Product/TableProductList';
import { reactiveClass } from '../../../../utils/class';
import { FaCartPlus, FaTable } from 'react-icons/fa';
import { Cart, CartFormData } from '../../../../types/cart';
import { useCartStore } from '../../../../store/useCartStore';
import ClientDropdown from '../../../../components/Client/ClientDropdown';
import { useClientStore } from '../../../../store/useClientStore';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../../../hook/data';
import axios from 'axios';
import { api, token } from '../../../../constant';
import toast from 'react-hot-toast';
import productServiceApi from '../../../../api/product.service.api';

function ProductDash() {

  const {data: pr, reFetch: reFetchPr} = useFetchProducts()
  const { products, setProducts } = useProductStore()
  const { tab: view, setTab: setView } = useStorage<"table" | "cards">("table", 'view-product');

  const { data: cat, reFetch } = useCategory()
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(cat?.map(c => ({ ...c, _id: c._id })) || [])
  }, [cat])

  useEffect(() => {
    setProducts(pr)
  }, [pr])
  

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'cart'>('products');

  const nav = useNavigate()

  const [oncartin, setOncart] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [formData, setFormData] = useState<CartFormData>({
    reference: '',
    clientId: '',
    items: [],
    status: 'pending',
  });

  const clients = useClientStore((state) => state.clients);

  const addToCart = () => {
    useCartStore.getState().addCart(formData);
    nav('/cart')
  };

  const handleAddItem = (product: Product) => {
    setFormData(prev => ({
      ...prev,
      reference: Date.now().toString(),
      items: [...prev.items, { productId: product._id!, quantity: 1, unitPrice: product.price || 0 }]
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((p) => p.productId !== productId)
    }));
  };

  const handleItemChange = (productId: string, field: any, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.productId === productId) {
          if (field === 'productId') {
            return {
              ...item,
              [field]: value,
              unitPrice: products.find(p => p._id === value)?.price || 0
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    }));
  };

  const handleCreateProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // @ts-ignore
    await productServiceApi.create(newProduct)
    .then(reFetchPr)
    .catch(() => toast.error('something wrong'))
    .finally(() => setIsProductFormOpen(false))
    // setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;

    // @ts-ignore
    const updatedProduct: Product = {
      ...productData,
    };

    // @ts-ignore
    await productServiceApi.update(editingProduct._id, updatedProduct)
    .then(reFetchPr)
    .catch(() => toast.error('something wrong'))
    .finally(() => setIsProductFormOpen(false))
    // setProducts(products.map(p => p._id! === editingProduct._id ? updatedProduct : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p._id !== id));
    }
  };

  const handleCreateCategory = async (categoryData: Omit<Category, 'id' | '_id' | 'createdAt' | 'updatedAt'>) => {
    const newCategory: Category = {
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };+
    // setCategories([...categories, newCategory]);
    await axios.post(`${api()}/products/categories`, newCategory, {
      headers: {
        Authorization: "Bearer " + token()
      }
    }).then(() => {
      setIsCategoryFormOpen(false);
      reFetch()
    })
    .catch((err) => toast.error(err?.response))
  };

  const handleUpdateCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingCategory) return;

    const updatedCategory: Category = {
      ...categoryData,
      _id: editingCategory._id,
      createdAt: editingCategory.createdAt,
      updatedAt: new Date(),
    };

    setCategories(categories.map(c => c._id === editingCategory._id ? updatedCategory : c));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    const hasProducts = products.some(product => product.category === id);
    if (hasProducts) {
      alert('Impossible de supprimer une catégorie qui contient des produits.');
      return;
    }
    setCategories(categories.filter(c => c._id !== id));
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

            <div className='flex items-center gap-3'>
              {oncartin ? <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaCartPlus className="h-4 w-4 mr-1 text-orange-500" />
                <span className='hidden md:inline'>Voir le panier ({formData.items.length})</span>
              </button> : null}
              {oncartin ? null : <button
                onClick={() => setOncart(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaCartPlus className="h-4 w-4 mr-1 text-orange-500" />
                <span className='hidden md:inline'>Ajouter un panier</span>
              </button>}
              {
                activeTab === "categories" ?
                  <FolderTree />
                  :
                  <div className="flex w-max p-1 bg-neutral-100 border rounded-lg mx-2">
                    <button
                      title="voir en tant que tableau"
                      onClick={() => setView("table")}
                      className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('table', view, 'bg-white border', '')}`}
                    >
                      <FaTable />
                    </button>
                    <button
                      title="voir en tant que carte"
                      onClick={() => setView("cards")}
                      className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('cards', view, 'bg-white border', '')}`}
                    >
                      <MdOutlineDashboard />
                    </button>
                  </div>
              }
            </div>
          </div>

          {(isProductFormOpen || editingProduct) && (
            <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
              <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
                <button onClick={() => {
                  setIsProductFormOpen(false);
                  setEditingProduct(null);
                }} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                  <AiFillCloseCircle size={24} />
                </button>
                <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
                  <Maximize size={24} />
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                </h2>
                <ProductForm
                  reFetchPr={reFetchPr}
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

          {isCartOpen && (
            <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
              <form onSubmit={addToCart} className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
                <button onClick={() => setIsCartOpen(false)} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                  <AiFillCloseCircle size={24} />
                </button>
                <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
                  <Maximize size={24} />
                </button>
                {formData.items.length > 0 ? (
                  <>
                    {
                      formData.items.map((item) => (
                        <div key={item.productId} className="flex justify-between items-center p-2 border-b">
                          <span>{products.find(p => p._id === item.productId)?.name} x{item.quantity}</span>
                          <span>{item.unitPrice * item.quantity} ar</span>
                        </div>
                      ))
                    }
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                          Référence
                        </label>
                        <input
                          type="text"
                          id="reference"
                          value={formData.reference || Date.now().toString()}
                          onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        />
                      </div>

                      <div className='flex items-end gap-3'>
                        <div className='w-full'>
                          <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
                            Client
                          </label>
                          <select
                            id="clientId"
                            value={formData.clientId}
                            onChange={(e) => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                          >
                            <option value="">Sélectionner un client</option>
                            {clients.map(client => (
                              <option key={client.id} value={client.id}>
                                {client.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <ClientDropdown onSubmit={(data) => {
                          const { id } = useClientStore.getState().addClient(data);
                          setFormData(prev => ({ ...prev, clientId: id }))
                        }} />
                      </div>

                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Statut
                        </label>
                        <select
                          id="status"
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Cart['status'] }))}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        >
                          <option value="pending">En attente</option>
                          <option value="completed">Terminée</option>
                          <option value="cancelled">Annulée</option>
                        </select>
                      </div>
                    </div>
                    <div className='flex gap-3 w-full'>
                      <button type='button' className="mt-3 w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800 " onClick={() => setFormData(prv => ({ ...prv, items: [] }))}>Vider le panier</button>
                      <button
                        type="submit"
                        className="mt-3 w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-800 "
                      >
                        <Plus className="inline h-4 w-4 mr-2" />
                        Créer la panier
                      </button>
                    </div>

                  </>
                ) : null}
              </form>
            </div>
          )}

          {((tab: typeof activeTab) => {
            switch (tab) {
              case 'products':
                return (
                  (isProductFormOpen || editingProduct) ? null :
                    <>
                      {
                        view === "cards" ?
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products?.map(product => (
                              <ProductCard
                                key={product._id}
                                product={product}
                                categorie={categories?.find(cg => cg._id === product.category)?.name}
                                onEdit={setEditingProduct}
                                onDelete={handleDeleteProduct}
                                oncartin={oncartin}
                                handleAddItem={handleAddItem}
                                handleRemoveItem={handleRemoveItem}
                                handleItemChange={handleItemChange}
                              />
                            ))}
                          </div>
                          : <TableProductList
                            products={products}
                            categories={categories}
                            onEdit={setEditingProduct}
                            onDelete={handleDeleteProduct}
                            oncartin={oncartin}
                            handleAddItem={handleAddItem}
                            handleRemoveItem={handleRemoveItem}
                            handleItemChange={handleItemChange}
                          />
                      }

                      {products?.length === 0 && (
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
                )
              case 'categories':
                return (
                  <>
                    <CategoryList
                      categories={categories}
                      onEdit={setEditingCategory}
                      onDelete={handleDeleteCategory}
                      setIsCategoryFormOpen={setIsCategoryFormOpen}
                    />
                  </>
                )
              default:
                break;
            }
          })(activeTab)}
        </div>
      </div >
    </div >
  );
}

export default ProductDash