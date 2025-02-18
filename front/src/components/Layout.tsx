import React from "react"
import Sidebar from "./Sidebar"
import { useParams } from "react-router-dom";

function Layout({children}: {children: React.ReactNode}) {

  const {tab} = useParams()
  console.log(tab);

  return (
    <div className="flex w-full h-full">
      <Sidebar tab={tab}/>
      <div className="flex-grow w-full h-full overflow-y-auto bg-white">
        {children}
      </div>
    </div>
  )
}

export default Layout
