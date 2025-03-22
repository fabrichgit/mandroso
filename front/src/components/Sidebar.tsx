import { Link, useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { reactiveClass } from "../utils/class"
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import { MdMapsHomeWork } from "react-icons/md";
import { user_store } from "../store/user";
import { HousePlug, PiggyBank, ShoppingCart, Users, UserSquareIcon } from "lucide-react";

function Sidebar({ tab }: { tab: string | undefined }) {

    const { data: user } = user_store()
    const nav = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear()
        nav('/login');
    }
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <aside className="md:min-w-64 w-max h-full overflow-hidden">
            <div className="w-full h-full flex flex-col justify-between text-white bg-[url('/bg-dall.webp')] rounded-r-2xl overflow-hidden shadow-lg">
                <div className="w-full bg-black/60 h-full">
                    <a className="flex items-center w-full px-3 mt-3" href="#">
                        <img src="/mandroso-logo.png" alt="" className="w-8 h-8"/>
                        <span className="ml-2 text-sm font-bold md:inline hidden">Mandroso</span>
                    </a>
                    <div className="w-full px-2">
                        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                            <Link to="/" className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-black/60 hover:text-gray-300" >
                                <MdMapsHomeWork />
                                <span className="ml-2 text-sm font-medium md:inline hidden">Tableau de Bord</span>
                            </Link>
                            <Link to="/caisse" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-black/60 hover:text-gray-300')} >
                                <PiggyBank />
                                <span className="ml-2 text-sm font-medium md:inline hidden">Tresorerie</span>
                            </Link>
                            <Link to="/products" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-black/60 hover:text-gray-300')} >
                                <AiFillProduct />
                                <span className="ml-2 text-sm font-medium md:inline hidden">Produits</span>
                            </Link>
                            <Link to="/cart" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-black/60 hover:text-gray-300')} >
                                <ShoppingCart />
                                <span className="ml-2 text-sm font-medium md:inline hidden">Panier & Livraison</span>
                            </Link>
                            <Link to="/entrepôts" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-black/60 hover:text-gray-300')} >
                                <HousePlug />
                                <span className="ml-2 text-sm font-medium md:inline hidden">Entrepôts</span>
                            </Link>
                            <Link to="/clients" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-black/60 hover:text-gray-300')} >
                                <Users />
                                <span className="ml-2 text-sm font-medium md:inline hidden">Clients</span>
                            </Link>
                            <Link to="/fournisseur_vendeur" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-black/60 hover:text-gray-300')} >
                                <UserSquareIcon />
                                <span className="ml-2 text-sm font-medium md:inline hidden">
                                    Fournisseur & Vendeur
                                </span>
                            </Link>
                            {user?.Role === "gerant" ? <Link to="/users" className={"flex items-center w-full h-12 px-3 mt-2 rounded " + reactiveClass(tab!, 'users', 'bg-gray-700', 'hover:bg-black/60 hover:text-gray-300')} >
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
                        className="flex items-center justify-center w-full h-16 mt-auto bg-orange-700 hover:bg-black/60 hover:text-gray-300"
                    >
                        <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="ml-2 text-sm font-medium md:inline hidden">compte</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
