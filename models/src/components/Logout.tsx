const Logout = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (value: boolean) => void;
}) => {
  const logout = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/logout", {
      credentials: "include",
    });
    setIsAuthenticated(false);
  };

  return (
    <div className="fixed top-4 right-4">
      <button
        className="fixed top-4 right-4 p-1 m-1 my-2 z-10 text-white text-lg font-bold
bg-emerald-500/50 hover:bg-emerald-500 transition duration-300 border border-emerald-400 rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
