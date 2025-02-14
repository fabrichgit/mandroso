import React from "react"
import Sidebar from "./Sidebar"

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-full">
      <Sidebar/>
      <div className="flex-1 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout
