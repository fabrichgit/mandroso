import { useState } from "react";
import { RiFolderAddFill } from "react-icons/ri";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";

const FloatingActionButton = ({setIsCategoryFormOpen, setIsProductFormOpen}: {setIsProductFormOpen: React.Dispatch<React.SetStateAction<boolean>>, setIsCategoryFormOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      {/* Options déroulantes */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2">
          <button onClick={() => setIsProductFormOpen(true)} className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
            <HiOutlineViewGridAdd className="text-orange-500" />
            nouveau produit
          </button>
          <button onClick={() => setIsCategoryFormOpen(true)} className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
            <RiFolderAddFill className="text-blue-500" />
            categorie
          </button>
          {/* <button onClick={handleLogout} className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
            <FiLogOut className="text-red-500" />
            Déconnexion
          </button> */}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center text-orange-600 bg-gray-100 rounded-full shadow-lg"
      >
        <FiPlus className="text-lg" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
