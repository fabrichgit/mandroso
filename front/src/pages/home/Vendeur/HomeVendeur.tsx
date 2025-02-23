import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import ProductDash from "./Product/ProductDash"
import Dashbord from "./Product/Dashbord/Dashbord"
import ClientDash from "./Client/ClientDash"

function HomeVendeur() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashbord />} />
                <Route path="/products" element={<ProductDash />} />
                <Route path="/clients" element={<ClientDash />} />
            </Routes>
        </Layout>
    )
}

export default HomeVendeur
