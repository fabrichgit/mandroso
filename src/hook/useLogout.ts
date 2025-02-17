import { useEffect } from "react"

function useHandleSession() {

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
      location.href="/"
      return;
    }
    localStorage.clear()
  })

}

export default useHandleSession