import { useNavigate } from "react-router-dom";
import useQuery from "../hook/useQuery";
import { useEffect, useState } from "react";
import { user_store } from "../store/user";
import { Button, Input } from "@mui/joy";
import { updatePass } from "../api/user";
import toast from "react-hot-toast";

function ResetPassword() {
  const nav = useNavigate();
  const token = useQuery("token");

  if (!token) {
    nav("/")
    return
  }

  const {data: user, reFetch} = user_store()
  const [load, setLoad] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem("token", token)
    reFetch()
  }, [])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setLoad(true)

    const {confirm, password} = {
        password: String(form.get("password")).trim(),
        confirm: String(form.get("confirm")).trim()
    }

    console.log(confirm, password);
    

    if (confirm !== password) {
        toast.error("Mot de passe ne correspond pas")
        return setLoad(false)
    }

    await updatePass({password})
    .then(() => {
        toast.success("succes")
        localStorage.removeItem("token")
        setTimeout(() => {
            nav("/login")
        }, 500);
    })
    .catch((err) => {
        toast.error(err.response?.message)
    })
    .finally(() => {
        setLoad(false)
    })
  }

  return user ? (
    <div className="w-screen h-screen bg-[url('/prisma.avif')] dark:bg-[url('/logo.png')] bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col items-center justify-center w-full h-full bg-black/90">
        <form onSubmit={submit} action="" className={`flex flex-col gap-4 p-4 w-[25rem] h-max bg-white rounded-lg ${load ? "animate-pulse" : ""}`}>
            <Input name="password" placeholder="Nouveau mot de passe" disabled={load} required/>
            <Input name="confirm" placeholder="Confirmer mot de passe" disabled={load} required/>
            <Button type="submit" disabled={load}>Submit</Button>
        </form>
      </div>
    </div>
  ) : null
}

export default ResetPassword;
