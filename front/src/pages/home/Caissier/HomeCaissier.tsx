import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import Dashbord from "./Dashbord/Dashbord"
import ProductDash from "../Gerant/Product/ProductDash"
import ClientDash from "../Vendeur/Client/ClientDash"
import Cart from "../Vendeur/Cart/Cart"
import EntrepotDash from "../Magasinier/Entrepôts/Entrepot"
import Fournisseur from "../Magasinier/Fournisseur/Fournisseur"
import Caisse from "./Caisse/Caisse"

type Props = {}

function HomeCaissier({ }: Props) {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/caisse" element={<Caisse />} />
        <Route path="/products" element={<ProductDash />} />
        <Route path="/clients" element={<ClientDash />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/entrepôts" element={<EntrepotDash />} />
        <Route path="/fournisseur_vendeur" element={<Fournisseur />} />
      </Routes>
    </Layout>
  )
}

export default HomeCaissier