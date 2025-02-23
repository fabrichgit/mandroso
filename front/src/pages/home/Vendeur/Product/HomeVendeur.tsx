import { Route, Routes } from "react-router-dom"
import ProductDash from "./ProductDash"
import Layout from "../../../../components/Layout"
import Dashbord from "./Dashbord/Dashbord"
import ClientDash from "../Client/ClientDash"

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
