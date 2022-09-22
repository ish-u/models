import { useState } from "react";
import Loader from "./Loader";

const Logout = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (value: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/logout", {
      credentials: "include",
    });
    setIsAuthenticated(false);
  };

  return (
    <>
      {!loading ? (
        <button
          className="p-1 m-1 my-2 z-10 text-white text-lg font-bold
        bg-emerald-500/50 hover:bg-emerald-500/75 transition duration-300 border border-emerald-400 rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Logout;
