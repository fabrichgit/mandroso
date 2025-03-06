import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../../store/useCartStore";
import { CartForm } from "../../../../components/Cart/CartForm";
import { CartList } from "../../../../components/Cart/CartList";
import { CartModal } from "../../../../components/Cart/CartModal";
import useStorage from "../../../../hook/useStorage";
import Delivery from "./Delivery";

function Cart() {

    const { tab: activeTab, setTab: setActiveTab } = useStorage<'cart' | 'delivery'>('cart', 'tab-cart');
    const { carts, editingCart, setEditingCart } = useCartStore();

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full border-b border-gray-200 mb-6 px-4">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('cart')}
                        className={`${activeTab === 'cart'
                            ? 'border-b-2 border-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Panier
                    </button>
                    <button
                        onClick={() => setActiveTab('delivery')}
                        className={`${activeTab === 'delivery'
                            ? 'border-b-2 border-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Bon de livraison
                    </button>
                </nav>
            </div>
            {
                activeTab === 'cart' ?
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center p-6 pb-0">
                                <ShoppingCart className="h-5 w-5 text-purple-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Gestion des Paniers
                                </h1>
                            </div>
                            <div className="text-sm text-gray-500">
                                Total: {carts.length}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <CartForm
                                onSubmit={useCartStore.getState().addCart}
                                isEditing={false}
                            />

                            <CartList
                                // setActiveTab={setActiveTab}
                                carts={carts}
                                // editCart={editCart}
                                onEdit={setEditingCart}
                                onDelete={useCartStore.getState().deleteCart}
                            />
                        </div>

                        {editingCart && (
                            <CartModal
                                isOpen={!!editingCart}
                                onClose={() => setEditingCart(null)}
                                cart={editingCart}
                                onSubmit={useCartStore.getState().editCart}
                            />
                        )}
                    </>
                    : null
            }
            {
                activeTab === 'delivery' ?
                    <>
                        <Delivery />
                    </>
                    : null
            }
        </div>
    )
}

export default Cart
