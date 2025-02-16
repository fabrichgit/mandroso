import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const FloatingActionButton = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      {/* Options déroulantes */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2">
          <Link to="?add=true&&type=role" className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
            <MdOutlinePostAdd className="text-orange-500" />
            Créer role
          </Link>
          <Link to="?add=true&&type=user" className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
            <FaUserPlus className="text-blue-500" />
            Utilisateur
          </Link>
          <button className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
            <FiLogOut className="text-red-500" />
            Déconnexion
          </button>
        </div>
      )}

      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FiPlus className="text-2xl" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
