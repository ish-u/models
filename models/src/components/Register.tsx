import React from "react";

const Login = () => {
  return (
    <div className="w-64 p-4 pb-6 my-8 rounded-md bg-indigo-700/75 border-2 border-indigo-600">
      <div className="text-3xl font-bold mb-2 h-1/6 text-white">Register</div>
      <div className="flex flex-col h-4/6 justify-evenly mt-4">
        <input
          className="border-2 border-indigo-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/75 placeholder:text-black/50 font-semibold"
          type="text"
          placeholder="name"
        />
        <input
          className="border-2 border-indigo-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/75 placeholder:text-black/50 font-semibold"
          type="email"
          placeholder="email"
        />
        <input
          className="border-2 border-indigo-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/75 placeholder:text-black/50 font-semibold"
          type="text"
          placeholder="username"
        />
        <input
          className="border-2 border-indigo-900/50 p-2 mb-4 focus:outline-none rounded-md bg-white/75 placeholder:text-black/50 font-semibold"
          type="password"
          placeholder="*******"
        />
      </div>
      <div className="w-full h-1/6 justify-center items-center flex text-lg font-semibold text-white">
        <button className="w-3/6 p-1 mb-4 border-indigo-900 border-2 bg-indigo-900/75 hover:bg-indigo-900 rounded-md">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
