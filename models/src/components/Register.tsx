import { useState } from "react";
import Snackbar from "./Snackbar";
import Loader from "./Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        name: name,
      }),
      credentials: "include",
    });
    const status = await res.status;
    if (status === 201) {
      setShowSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setName("");
    } else {
      setShowError(true);
    }
    setLoading(false);
  };

  return (
    <div className="w-64 p-4 pb-6 my-8 rounded-md bg-emerald-700/90 border-2 border-emerald-600">
      <div className="text-3xl font-bold mb-2 h-1/6 text-white">Register</div>
      <div className="flex flex-col h-4/6 justify-evenly mt-4">
        <input
          className="border-2 border-emerald-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/90 placeholder:text-black/50 font-semibold"
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <input
          className="border-2 border-emerald-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/90 placeholder:text-black/50 font-semibold"
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          className="border-2 border-emerald-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/90 placeholder:text-black/50 font-semibold"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <input
          className="border-2 border-emerald-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/90 placeholder:text-black/50 font-semibold"
          type="password"
          placeholder="*******"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>
      <div className="w-full h-1/6 justify-center items-center flex text-lg font-semibold text-white">
        {!loading ? (
          <button
            onClick={register}
            className="w-3/6 p-1 border-emerald-900/50 border-2 bg-emerald-900  rounded-md"
            disabled={
              username === "" || password === "" || email === "" || name === ""
            }
          >
            Register
          </button>
        ) : (
          <Loader />
        )}
      </div>

      {showSuccess && (
        <Snackbar setShowMessage={setShowSuccess} error="account created" />
      )}
      {showError && (
        <Snackbar setShowMessage={setShowError} error="something went wrong" />
      )}
    </div>
  );
};

export default Register;
