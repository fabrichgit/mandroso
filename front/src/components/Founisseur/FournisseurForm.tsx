import React, { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { Fournisseur, FournisseurFormData } from '../../types/fournisseur';
import { useVendeurStore } from '../../store/useFournisseurStore';
import VendeurDropdown from './VendeurDropdown';

interface ClientFormProps {
  onSubmit: (client: FournisseurFormData) => void;
  initialData?: Fournisseur;
  isEditing?: boolean;
}

export function FournisseurForm({ onSubmit, initialData, isEditing = false }: ClientFormProps) {

  const [isOpen, setOpening] = useState(false)
  const { vendeurs, add: addVendeur } = useVendeurStore()

  const [formData, setFormData] = useState<FournisseurFormData>({
    nom: '',
    telephone: '',
    nif: '',
    stat: '',
    adresse: '',
    compte: '',
    credit: '',
    livraison: '',
    vendeurs: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nom: initialData.nom,
        telephone: initialData.telephone,
        nif: initialData.nif,
        stat: initialData.stat,
        adresse: initialData.adresse,
        compte: initialData.compte,
        credit: initialData.credit,
        livraison: initialData.livraison,
        vendeurs: initialData.vendeurs
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      setFormData({
        nom: '',
        telephone: '',
        nif: '',
        stat: '',
        adresse: '',
        compte: '',
        credit: '',
        livraison: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Modifier' : '+ Nouveau'}
      </h2>

      <div className="flex flex-wrap gap-8">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>


        <div>
          <label htmlFor="Telephone" className="block text-sm font-medium text-gray-700">
            Telephone
          </label>
          <input
            type="text"
            id="Telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="vendeur" className="block text-sm font-medium text-gray-700">
            Vendeur
          </label>
          <div className='flex items-center gap-3 w-full justify-between relative'>
            <div id='vendeur' onClick={() => setOpening(p => !p)} className='inline py-2 border rounded-lg cursor-pointer w-max max-w-[90%] px-3 overflow-hidden'>
              {formData.vendeurs?.length === 0 || !formData.vendeurs ? "selectionnner des vendeurs" : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.vendeurs?.map((vd, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-orange-100 text-orange-800"
                    >
                      {vd.nom}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({...prev, vendeurs: prev.vendeurs?.filter(vnd => vnd.id !== vd.id)}))
                        }}
                        className="ml-1 inline-flex items-center p-0.5 h-max rounded-full text-orange-400 hover:bg-orange-200 hover:text-orange-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <VendeurDropdown onOpen={() => setOpening(false)} onSubmit={(data) => {
              addVendeur(data)
              setFormData(prev => ({ ...prev, vendeurs: [data, ...(prev.vendeurs || [])] }))
            }} />
            {isOpen ? <div className='block w-full absolute top-full h-max border bg-zinc-200 p-3 rounded-lg shadow-xl'>
              <div className='flex flex-col w-full h-max'>
                {
                  vendeurs.map(vd => (
                    <div className='flex gap-3 items-center'>
                      <input type="checkbox" name="" id="" className='cursor-pointer' checked={formData.vendeurs?.includes(vd)} onChange={() => !formData.vendeurs?.includes(vd) ? setFormData(prev => ({ ...prev, vendeurs: [vd, ...(prev.vendeurs || [])] })) : setFormData(prev => ({ ...prev, vendeurs: prev.vendeurs?.filter(vnd => vnd.id !== vd.id) }))}/>
                      <label htmlFor="">{vd.nom}</label>
                    </div>
                  ))
                }
              </div>
            </div> : null}
          </div>
        </div>

        <div>
          <label htmlFor="nif" className="block text-sm font-medium text-gray-700">
            NIF
          </label>
          <input
            type="text"
            id="nif"
            name="nif"
            value={formData.nif}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="stat" className="block text-sm font-medium text-gray-700">
            STAT
          </label>
          <input
            type="text"
            id="stat"
            name="stat"
            value={formData.stat}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="compte" className="block text-sm font-medium text-gray-700">
          Compte
          </label>
          <input
            type="text"
            id="compte"
            name="compte"
            value={formData.compte}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="credit" className="block text-sm font-medium text-gray-700">
            Durée de Credit
          </label>
          <input
            type="text"
            id="credit"
            name="credit"
            value={formData.credit}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="livraison" className="block text-sm font-medium text-gray-700">
          Durée de livraison
          </label>
          <input
            type="text"
            id="livraison"
            name="livraison"
            value={formData.livraison}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center h-max px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </>
          )}
        </button>
      </div>
    </form>
  );
}