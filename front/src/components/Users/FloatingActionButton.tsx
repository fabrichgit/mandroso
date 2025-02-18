import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const FloatingActionButton = () => {

  // const nav = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  // const handleLogout = () => {
  //   nav('/login');
  //   localStorage.clear()
  // }

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
