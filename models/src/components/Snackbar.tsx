import { useEffect, useState } from "react";

const Snackbar = ({
  error,
  setShowMessage,
}: {
  error: string;
  setShowMessage: (value: boolean) => void;
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    const timeout = setTimeout(() => {
      setShow(false);
      setShowMessage(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {show && (
        <div className="fixed bottom-4 left-0 w-full flex justify-center">
          <div className="border-4 border-red-700 rounded-lg text-white p-2 px-2 text-xl font-semibold bg-red-500/50">
            {error}
          </div>
        </div>
      )}
    </>
  );
};

export default Snackbar;
