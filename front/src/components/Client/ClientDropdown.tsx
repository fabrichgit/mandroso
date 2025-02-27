import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ClientFormData } from "../../types/client";
import toast from "react-hot-toast";

export default function ClientDropdown({ onSubmit }: { onSubmit?: (data: ClientFormData) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    contact: '',
    nif: '',
    stat: '',
    type: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.type) {
      toast.error('fields required !');
      setIsOpen(false)
      return
    }
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ name: '', contact: '', nif: '', stat: '', type: '' });
    setIsOpen(false)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
            <input
              type="text"
              placeholder="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
            <input
              type="text"
              placeholder="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
            <input
              type="text"
              placeholder="nif"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <input
              type="text"
              placeholder="stat"
              name="stat"
              value={formData.stat}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
            onClick={handleSubmit}
              type="button"
              className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800 text-sm"
            >
              entrer ce client
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
