import { PropsWithChildren, useEffect } from "react";
import { auth } from "../api/auth";
import { user_store } from "../store/user";
import { useNavigate } from "react-router-dom";
import {HashLoader} from "react-spinners";

function Protected({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const user = user_store();

  useEffect(() => {
    auth()
      .then((res) => {
        user.update(res);
      })
      .catch(() => {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        nav("/login");
      });
  }, []);

  return (
    <>
      {user.data ? (
        children
      ) : (
        <div className="absolue left-0 top-0 flex items-center justify-center min-h-screen w-screen bg-gray-100">
          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <HashLoader color="#5850EC" size={60}/>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Veulliez patientez ...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Protected;
