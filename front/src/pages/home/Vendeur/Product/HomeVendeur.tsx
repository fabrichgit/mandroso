import { Route, Routes } from "react-router-dom"
import ProductDash from "./ProductDash"
import Layout from "../../../../components/Layout"
import Dashbord from "./Dashbord/Dashbord"

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
