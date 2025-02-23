import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import Users from "./Users/Users"
import Dashbord from "./Dashbord/Dashbord"
import ProductDash from "../Vendeur/Product/ProductDash"
import ClientDash from "../Vendeur/Client/ClientDash"

function HomeGerant() {
  return (
    <Layout>
        <Routes>
            <Route path="/" element={<Dashbord/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/products" element={<ProductDash/>}/>
            <Route path="/clients" element={<ClientDash/>}/>
        </Routes>
    </Layout>
  )
}

export default HomeGerant
