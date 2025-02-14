import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function useHandleSession() {
  const nav = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
      return nav("/")
    }
    localStorage.clear()
  })
}

export default useHandleSession