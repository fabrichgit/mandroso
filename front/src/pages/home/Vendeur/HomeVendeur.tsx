import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import ProductDash from "./Product/ProductDash"

function HomeVendeur() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<ProductDash />} />
            </Routes>
        </Layout>
    )
}

export default HomeVendeur
