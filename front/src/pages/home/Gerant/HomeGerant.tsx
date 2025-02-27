import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import Users from "./Users/Users"
import Dashbord from "./Dashbord/Dashbord"
import ProductDash from "./Product/ProductDash"
import ClientDash from "../Vendeur/Client/ClientDash"
import Commande from "../Vendeur/Cart/Cart"

function HomeGerant() {
  return (
    <Layout>
        <Routes>
            <Route path="/" element={<Dashbord/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/products" element={<ProductDash/>}/>
            <Route path="/clients" element={<ClientDash/>}/>
            <Route path="/cart" element={<Commande />} />
        </Routes>
    </Layout>
  )
}

export default HomeGerant
