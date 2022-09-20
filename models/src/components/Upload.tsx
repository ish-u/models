import { useState } from "react";

const Upload = ({ getFiles }: { getFiles: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const uploadFile = async () => {
    const data = new FormData();
    if (file) {
      console.log(file);
      data.append("file", file);
      console.log(data);
      const res = await fetch(import.meta.env.VITE_API_URL + "/upload", {
        method: "POST",
        body: data,
      });
      if (res.status === 201) {
        const resData = await res.json();
        console.log(resData);
        await getFiles();
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <input
        className=" p-1 m-1 my-2 z-10 text-white text-lg font-bold
          bg-emerald-500/50 hover:bg-emerald-500 transition duration-300 border border-emerald-400 rounded-md"
        type="file"
        name="file"
        onChange={(event) => {
          const uploadFile: File | undefined = event.target.files
            ? event.target.files[0]
            : undefined;
          if (uploadFile) {
            setFile(uploadFile);
          }
        }}
      />
      <button
        className=" p-1 m-1 my-2 z-10 text-white text-lg font-bold
        bg-emerald-500/50 hover:bg-emerald-500 transition duration-300 border border-emerald-400 rounded-md"
        onClick={uploadFile}
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;
