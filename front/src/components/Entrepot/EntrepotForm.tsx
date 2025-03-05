import React, { useState } from 'react';
import { Entrepot, useEntrepot } from '../../store/useEntrepot';
import { Plus, Save, X } from 'lucide-react';

interface EntrepotFormProps {
  entrepot?: Entrepot;
  onClose?: () => void;
}

export function EntrepotForm({ entrepot, onClose }: EntrepotFormProps) {
  const [address, setAddress] = useState(entrepot?.adress || '');
  const [newPlace, setNewPlace] = useState('');
  const [places, setPlaces] = useState<string[]>(entrepot?.places || []);
  
  const { add, update } = useEntrepot();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Entrepot = {
      id: Date.now().toString(),
      adress: address,
      places: places,
    };

    if (entrepot?.id) {
      update(entrepot.id, data);
    } else {
      add(data);
    }

    onClose?.();
  };

  const addPlace = () => {
    if (newPlace.trim()) {
      setPlaces([...places, newPlace.trim()]);
      setNewPlace('');
    }
  };

  const removePlace = (index: number) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Emplacements</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="Nouvel emplacement"
          />
          <button
            type="button"
            onClick={addPlace}
            className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {places.map((place, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <span>{place}</span>
            <button
              type="button"
              onClick={() => removePlace(index)}
              className="text-red-600 hover:text-red-800"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
        >
          <Save size={20} />
          {entrepot ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
}