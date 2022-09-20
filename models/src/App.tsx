import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/files");
        const data = await res.json();
        setFiles(data.files);
      } catch (err) {
        console.error(err);
      }
    };

    if (!files.length) {
      getFiles();
    }
  }, []);

  return <Canvas files={files} />;
}

export default App;
