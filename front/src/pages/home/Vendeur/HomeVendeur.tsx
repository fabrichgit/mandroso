import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import ProductDash from "../Gerant/Product/ProductDash"
import Dashbord from "../Gerant/Product/Dashbord/Dashbord"
import ClientDash from "./Client/ClientDash"
import Commande from "./Cart/Cart"

function HomeVendeur() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashbord />} />
                <Route path="/products" element={<ProductDash />} />
                <Route path="/clients" element={<ClientDash />} />
                <Route path="/cart" element={<Commande />} />
            </Routes>
        </Layout>
    )
}

export default HomeVendeur
