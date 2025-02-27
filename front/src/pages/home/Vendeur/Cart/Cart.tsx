import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../../store/useCartStore";
import { CartForm } from "../../../../components/Cart/CartForm";
import { CartList } from "../../../../components/Cart/CartList";
import { CartModal } from "../../../../components/Cart/CartModal";

function Cart() {

    const { carts, editingCart, setEditingCart } = useCartStore();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center p-6 pb-0">
                    <ShoppingCart className="h-5 w-5 text-purple-600 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gestion des Paniers
                    </h1>
                </div>
                <div className="text-sm text-gray-500">
                    Total commandes: {carts.length}
                </div>
            </div>

            <div className="space-y-8">
                <CartForm
                    onSubmit={useCartStore.getState().addCart}
                    isEditing={false}
                />

                <CartList
                    carts={carts}
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
        </div>
    )
}

export default Cart
