import { useState, useRef } from "react";
import Loader from "./Loader";
import Snackbar from "./Snackbar";

const Upload = ({ getFiles }: { getFiles: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async () => {
    const data = new FormData();
    if (file) {
      setLoading(true);
      data.append("file", file);
      const res = await fetch(import.meta.env.VITE_API_URL + "/upload", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (res.status === 201) {
        if (fileRef.current) {
          fileRef.current.value = "";
          setLoading(false);
          setShowSuccess(true);
        }
        await getFiles();
      } else {
        setLoading(false);
        setShowError(true);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex  align-middle">
      <input
        className=" p-1 m-1 my-2 z-10 text-white text-lg font-bold
          bg-emerald-500/50 hover:bg-emerald-500/75 transition duration-300 border border-emerald-400 rounded-md"
        type="file"
        name="file"
        accept=".glb,.glft"
        onChange={(event) => {
          const uploadFile: File | undefined = event.target.files
            ? event.target.files[0]
            : undefined;
          if (uploadFile) {
            setFile(uploadFile);
          }
        }}
        ref={fileRef}
      />
      <div className="flex flex-col justify-center">
        {!loading ? (
          <button
            className=" p-1 m-1 my-2 z-10 text-white text-lg font-bold
        bg-emerald-500/50 hover:bg-emerald-500/75 transition duration-300 border border-emerald-400 rounded-md"
            onClick={uploadFile}
          >
            Upload
          </button>
        ) : (
          <div className="mx-4">
            <Loader />
          </div>
        )}
      </div>

      {showSuccess && (
        <Snackbar setShowMessage={setShowSuccess} error="file uploaded" />
      )}
      {showError && (
        <Snackbar setShowMessage={setShowError} error="something went wrong" />
      )}
    </div>
  );
};

export default Upload;
