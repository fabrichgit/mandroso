import { Link, useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { reactiveClass } from "../utils/class"
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import { MdMapsHomeWork } from "react-icons/md";
import { user_store } from "../store/user";
import { ShoppingCart, Users } from "lucide-react";

function Sidebar({ tab }: { tab: string | undefined }) {

    const {data: user} = user_store()
    const nav = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear()
        nav('/login');
    }
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Ferme le dropdown si on clique en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <aside className="flex flex-col justify-between md:w-56 w-max h-full overflow-hidden text-white bg-black/90 rounded">
            <div className="w-full">
                <a className="flex items-center w-full px-3 mt-3" href="#">
                    <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    <span className="ml-2 text-sm font-bold md:inline hidden">Mandroso</span>
                </a>
                <div className="w-full px-2">
                    <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                        <Link to="/" className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" >
                            <MdMapsHomeWork/>
                            <span className="ml-2 text-sm font-medium md:inline hidden">Tableau de Bord</span>
                        </Link>
                        <Link to="/products" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-gray-700 hover:text-gray-300')} >
                            <AiFillProduct />
                            <span className="ml-2 text-sm font-medium md:inline hidden">Produits</span>
                        </Link>
                        <Link to="/cart" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-gray-700 hover:text-gray-300')} >
                            <ShoppingCart />
                            <span className="ml-2 text-sm font-medium md:inline hidden">Panier</span>
                        </Link>
                        <Link to="/clients" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-gray-700 hover:text-gray-300')} >
                            <Users />
                            <span className="ml-2 text-sm font-medium md:inline hidden">Clients</span>
                        </Link>
                        {user?.Role === "gerant" ? <Link to="/users" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-gray-700 hover:text-gray-300')} >
                            <FaUser />
                            <span className="ml-2 text-sm font-medium md:inline hidden">Utilisateurs</span>
                        </Link> : null}
                    </div>
                </div>
            </div>

            <div className="relative w-full h-max">
                {/* Dropdown flottant */}
                {isOpen && (
                    <div ref={dropdownRef} className="absolute bottom-full right-2 w-40 py-2">
                        <div className="flex flex-col items-end gap-2 text-black">
                            <Link to="#" className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
                                <FaUser className="text-blue-500" />
                                <span className="hidden md:inline">Profile</span>
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 p-3 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition">
                                <FiLogOut className="text-red-500" />
                                <span className="hidden md:inline">Déconnexion</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Bouton compte */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center w-full h-16 mt-auto bg-orange-700 hover:bg-gray-700 hover:text-gray-300"
                >
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-2 text-sm font-medium md:inline hidden">compte</span>
                </button>
            </div>
        </aside>

    )
}

export default Sidebar
