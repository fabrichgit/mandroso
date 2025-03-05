import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import ProductDash from "../Gerant/Product/ProductDash"
import Dashbord from "../Gerant/Product/Dashbord/Dashbord"
import ClientDash from "./Client/ClientDash"
import Commande from "./Cart/Cart"
import Fournisseur from "../Magasinier/Fournisseur/Fournisseur"
import EntrepotDash from "../Magasinier/Entrepôts/Entrepot"

function HomeVendeur() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashbord />} />
                <Route path="/products" element={<ProductDash />} />
                <Route path="/clients" element={<ClientDash />} />
                <Route path="/cart" element={<Commande />} />
                <Route path="/entrepôts" element={<EntrepotDash />} />
                <Route path="/fournisseur_vendeur" element={<Fournisseur />} />
            </Routes>
        </Layout>
    )
}

export default HomeVendeur
