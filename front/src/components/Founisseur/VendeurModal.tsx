// import { Maximize } from 'lucide-react';
// import { Vendeurs } from '../../types/fournisseur';
// import { AiFillCloseCircle } from 'react-icons/ai';
// import resize from '../../utils/maximise';
// import { FournisseurForm } from './FournisseurForm';

// interface ClientModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     client: Vendeurs;
//     onSubmit: (data: Vendeurs) => void;
// }

// export function VendeurModal({ isOpen, onClose, client, onSubmit }: ClientModalProps) {
//     if (!isOpen) return null;

//     return (
//         <div className="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black/70 overflow-y-auto">
//             <div className="bg-white p-2 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
//                 <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
//                     <AiFillCloseCircle size={24} />
//                 </button>
//                 <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
//                     <Maximize size={24} />
//                 </button>

//                 <div className="bg-white p-0">
//                     <FournisseurForm
//                         onSubmit={(data) => {
//                             onSubmit(data);
//                             onClose();
//                         }}
//                         initialData={client}
//                         isEditing={true}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }