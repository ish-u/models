import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import Login from "./components/Login";
import Register from "./components/Register";

import URL from "../src/assets/background.webp";

function App() {
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<"login" | "register">("login");

  useEffect(() => {
    setLoading(true);
    const checkSession = async () => {
      const res = await fetch(import.meta.env.VITE_API_URL + "/check", {
        credentials: "include",
      });
      if (res.status === 201) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  if (isAutenticated) {
    return <Canvas setIsAuthenticated={setIsAuthenticated} />;
  } else {
    return (
      <>
        <div className="h-screen w-screen flex flex-col items-center justify-center pb-32 bg-slate-900/50">
          <div className="fixed  top-0 justify-center flex -z-10 w-screen h-screen bg-black flex-wrap ">
            <img className="object-cover object-center  w-screen" src={URL} />
          </div>
          <div className="text-transparent text-8xl font-bold bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 animate-text">
            models
          </div>

          {!loading && (
            <>
              {page === "login" && (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )}
              {page === "register" && <Register />}
              <div className="flex flex-start text-white">
                <a
                  className="mx-4 p-1 hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setPage("login");
                  }}
                >
                  Login
                </a>
                <a
                  className="mx-4 p-1 hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setPage("register");
                  }}
                >
                  Register
                </a>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default App;
