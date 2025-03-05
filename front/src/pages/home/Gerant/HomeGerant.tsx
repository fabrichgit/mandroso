import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import Users from "./Users/Users"
import Dashbord from "./Dashbord/Dashbord"
import ProductDash from "./Product/ProductDash"
import ClientDash from "../Vendeur/Client/ClientDash"
import Commande from "../Vendeur/Cart/Cart"
import Fournisseur from "../Magasinier/Fournisseur/Fournisseur"
import EntrepotDash from "../Magasinier/Entrepôts/Entrepot"

function HomeGerant() {
  return (
    <Layout>
        <Routes>
            <Route path="/" element={<Dashbord/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/products" element={<ProductDash/>}/>
            <Route path="/clients" element={<ClientDash/>}/>
            <Route path="/cart" element={<Commande />} />
            <Route path="/entrepôts" element={<EntrepotDash />} />
            <Route path="/fournisseur_vendeur" element={<Fournisseur />} />
        </Routes>
    </Layout>
  )
}

export default HomeGerant
