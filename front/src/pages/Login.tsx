import { useNavigate } from "react-router-dom";
import useHandleSession from "../hook/useLogout";
import { Auth } from "../api/auth";
import toast from "react-hot-toast";
import { userService } from "../api/user.service.api";

function Login() {
  useHandleSession();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data: Auth = {
      name: String(form.get("name")).trim(),
      password: String(form.get("password")).trim(),
    };

    // await login(data)
    await userService.authenticate({login: data.name, password: data.password})
      .then(({data: {token}}) => {
        localStorage.setItem("token", token);
        nav("/");
      })
      .catch(() => toast.error("Auth error"));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600/5 to-cyan-300/70 flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <form onSubmit={submit}>
          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-semibold text-gray-600">MANDROSO | login</h1>
              <hr />
              <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input className="pl-2 outline-none border-none w-full" type="text" name="name" placeholder="Username" required />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input className="pl-2 outline-none border-none w-full" type="password" name="password" placeholder="Password" required />
              </div>
            </div>
            <button type="submit" value="login" id="login" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-orange-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Login</button>
          </div>
        </form>

      </div>

    </div>
  );
}

export default Login;
