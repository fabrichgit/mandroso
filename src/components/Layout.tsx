import React from "react"
import Sidebar from "./Sidebar"
import { useParams } from "react-router-dom";

function Layout({children}: {children: React.ReactNode}) {

  const {tab} = useParams()
  console.log(tab);

  return (
    <div className="flex h-full">
      <Sidebar tab={tab}/>
      <div className="flex-1 w-full h-full overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout
