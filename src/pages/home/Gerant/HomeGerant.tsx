import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/Layout"
import Users from "./Users/Users"

function HomeGerant() {
  return (
    <Layout>
        <Routes>
            <Route path="/" element/>
            <Route path="/users" element={<Users/>}/>
        </Routes>
    </Layout>
  )
}

export default HomeGerant
