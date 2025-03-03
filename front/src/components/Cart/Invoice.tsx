import { useRef } from 'react';
import { Printer } from 'lucide-react';
import { Cart } from '../../types/cart';
import { useClientStore } from '../../store/useClientStore';
import { useProductStore } from '../../store/useProductStore';

interface InvoiceProps {
    cart: Cart;
    onClose: () => void;
}

export function Invoice({ cart, onClose }: InvoiceProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const clients = useClientStore((state) => state.clients);
    const products = useProductStore((state) => state.products);

    const client = clients.find(c => c.id === cart.clientId);

    const handlePrint = () => {
        const content = printRef.current;
        if (content) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
          <html>
            <head>
              <title>Facture ${cart.reference}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .invoice-header { margin-bottom: 30px; }
                .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .invoice-table th { background-color: #f8f9fa; }
                .invoice-footer { margin-top: 30px; }
                .total-section { margin-top: 20px; }
                .total-line { display: flex; justify-content: space-between; margin: 5px 0; }
                @media print {
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${content.innerHTML}
            </body>
          </html>
        `);
                printWindow.document.close();
                printWindow.print();
            }
        }
    };

    const calculateTVA = () => {
        return cart.totalAmount * 0.2; // TVA à 20%
    };

    const calculateTotal = () => {
        return cart.totalAmount + calculateTVA();
    };

    return (
        <div className="absolute inset-0 z-50 overflow-y-auto bg-white">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-2xl font-bold">Facture {cart.reference}</h2>
                <div className="space-x-4">
                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimer
                    </button>
                    <button
                        onClick={onClose}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Fermer
                    </button>
                </div>
            </div>

            <div ref={printRef} className="p-8">
                <div className="invoice-header">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-4">FACTURE</h1>
                            <p className="text-gray-600">Référence: {cart.reference}</p>
                            <p className="text-gray-600">Date: {new Date(cart.createdAt).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-semibold mb-2">Client</h2>
                            {client && (
                                <>
                                    <p className="text-gray-600">{client.name}</p>
                                    <p className="text-gray-600">{client.contact}</p>
                                    <p className="text-gray-600">NIF: {client.nif}</p>
                                    <p className="text-gray-600">STAT: {client.stat}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Quantité</th>
                            <th>Prix unitaire</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item, index) => {
                            const product = products.find(p => p.id === item.productId);
                            return (
                                <tr key={index}>
                                    <td>{product?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unitPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })}</td>
                                    <td>{(item.quantity * item.unitPrice).toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="total-section border-t pt-4">
                    <div className="total-line">
                        <span>Sous-total HT:</span>
                        <span>{cart.totalAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })}</span>
                    </div>
                    <div className="total-line">
                        <span>TVA (20%):</span>
                        <span>{calculateTVA().toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })}</span>
                    </div>
                    <div className="total-line font-bold">
                        <span>Total TTC:</span>
                        <span>{calculateTotal().toLocaleString('fr-FR', { style: 'currency', currency: 'MGA' })}</span>
                    </div>
                </div>

                <div className="invoice-footer mt-8 text-sm text-gray-600">
                    <p>Merci de votre confiance !</p>
                    <p>Pour toute question concernant cette facture, merci de nous contacter.</p>
                </div>
            </div>
        </div>
    );
}