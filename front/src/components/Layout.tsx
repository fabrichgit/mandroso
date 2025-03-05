import React from "react"
import Sidebar from "./Sidebar"
import { useParams } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {

  const { tab } = useParams()

  return (
    <div className="flex w-full h-full ">
      <Sidebar tab={tab} />
      <main className="relative flex-grow w-full h-full overflow-y-auto bg-[url('/neon.png')] bg-cover">
        <div className="absolute z-0 bg-white/90 w-full h-full"></div>
        <div className="absolute z-10 w-full h-full">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
