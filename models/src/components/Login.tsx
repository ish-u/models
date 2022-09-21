import { useState } from "react";

const Login = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (value: boolean) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    });
    const status = await res.status;
    if (status === 201) {
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="w-64 p-4 pb-6 my-8 rounded-md bg-indigo-700/75 border-2 border-indigo-600">
      <div className="text-3xl font-bold mb-2 h-1/6 text-white">Login</div>
      <div className="flex flex-col h-4/6 justify-evenly mt-4">
        <input
          className="border-2 border-indigo-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/75 placeholder:text-black/50 font-semibold"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="border-2 border-indigo-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/75 placeholder:text-black/50 font-semibold"
          type="password"
          placeholder="*******"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="w-full h-1/6 justify-center items-center flex text-lg font-semibold text-white">
        <button
          onClick={login}
          className="w-3/6 p-1 mb-4 border-indigo-900/50 border-2 bg-indigo-900 hover:bg-indigo-900 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
