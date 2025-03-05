import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Vendeurs } from "../../types/fournisseur";

export default function VendeurDropdown({ onSubmit, onClose, onOpen }: { onSubmit?: (data: Vendeurs) => void, onOpen?: () => void, onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Vendeurs>({
    aPropos: '',
    nom: '',
    telephone: '',
  });

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen()
    } else if (onClose) {
      onClose()
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({...formData, id: Date.now().toString()});
    }
    setFormData({
      aPropos: '',
      nom: '',
      telephone: '',
    });
    setIsOpen(false)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-2 top-0 bg-gray-50 shadow-lg rounded-2xl p-3 w-64">
          <div className="flex justify-between items-center">
            <button type="button" onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>

          <div className="mt-2 space-y-2">
            <input
              type="name"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
            <input
              type="tel"
              placeholder="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
            <textarea
              placeholder="aPropos"
              name="aPropos"
              value={formData.aPropos}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800 text-sm"
            >
              entrer vendeur
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
