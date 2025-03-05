import React from "react"
import Sidebar from "./Sidebar"
import { useParams } from "react-router-dom";

function Layout({children}: {children: React.ReactNode}) {

  const {tab} = useParams()

  return (
    <div className="flex w-full h-full bg-[url('/neon.png')]">
      <Sidebar tab={tab}/>
      <main className="flex-grow w-full h-full overflow-y-auto bg-[url('/neon.png')]">
        {children}
      </main>
    </div>
  )
}

export default Layout
