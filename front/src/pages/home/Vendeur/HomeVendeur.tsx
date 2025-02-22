import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import ProductDash from "./Product/ProductDash"
import Dashbord from "./Product/Dashbord/Dashbord"

function HomeVendeur() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashbord />} />
                <Route path="/products" element={<ProductDash />} />
            </Routes>
        </Layout>
    )
}

export default HomeVendeur
