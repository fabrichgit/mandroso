import { Maximize } from 'lucide-react';
import { AiFillCloseCircle } from 'react-icons/ai';
import resize from '../../../utils/maximise';
import { TableCommande } from '../../../store/useTableCommandeStore';
import { TableCommandeForm } from './TableCommandeForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  commande: TableCommande;
  onSubmit: (data: TableCommande) => void;
}

export function TableCommandeModal({ isOpen, onClose, commande, onSubmit }: Props) {
  if (!isOpen) return null;

  return (
    <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
      <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
          <AiFillCloseCircle size={24} />
        </button>
        <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
          <Maximize size={24} />
        </button>

        <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
          <TableCommandeForm
            onSubmit={(data) => {
              onSubmit(data);
              onClose();
            }}
            initialData={commande}
            isEditing={true}
          />
        </div>

      </div>
    </div>
  );
}