import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Object3D } from "three";
import Controls from "./Controls";
import File from "./File";

const Canvas = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (value: boolean) => void;
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [loader, setLoader] = useState<GLTFLoader | null>(null);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState("");
  const [showMenu, setShowMenu] = useState<"File" | "Control" | "None">("None");
  const [progress, setProgress] = useState(0.0);

  const getFiles = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/files", {
        credentials: "include",
      });
      const data = await res.json();
      setFiles(data.files);
    } catch (err) {
      console.error(err);
    }
  };

  const load = async () => {
    if (loader && camera && renderer && scene) {
      if (scene) {
        const objects = scene?.children;
        let objectToRemove: Object3D | null = null;
        objects.forEach((o) => {
          if (o.type === "Group") {
            objectToRemove = o;
          }
        });
        if (objectToRemove) {
          scene.remove(objectToRemove);
        }
      }

      const res = await fetch(import.meta.env.VITE_API_URL + "/file/" + file, {
        credentials: "include",
      });
      const URL = (await res.json()).url;
      setProgress(0);

      loader.load(
        URL,
        (gltf) => {
          gltf.scene.scale.set(10, 10, 10);
          scene.add(gltf.scene);
        },
        (progressEvent) => {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
        },
        (err) => console.error(err)
      );
    }
  };

  const animate = () => {
    console.log("animate");
    function loop() {
      requestAnimationFrame(loop);
      if (scene && camera && renderer) {
        renderer.render(scene, camera);
      }
    }
    loop();
  };

  const resize = () => {
    if (camera && scene && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  };

  const setup = () => {
    // SCENE
    const newScene = new THREE.Scene();

    // CAMERA
    const newCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    newCamera.position.x = 2;
    newCamera.position.y = 2;
    newCamera.position.z = 2;

    // RENDERER
    const newRenderer = new THREE.WebGLRenderer({
      canvas: canvas.current as HTMLCanvasElement,
    });
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.setClearColor(0x0f0f0f);

    // GLTF LOADER
    const gltfLoader = new GLTFLoader();
    setLoader(gltfLoader);

    // Adding the Camera
    newScene.add(newCamera);

    // Adding Lighting
    const light = new THREE.PointLight(0xffffff, 5);
    light.position.set(5, 5, 5);
    newScene.add(light);

    const ambLight = new THREE.AmbientLight(0x404040, 10); // soft white light
    newScene.add(ambLight);

    // Adding orbit controls
    const orbit = new OrbitControls(newCamera, newRenderer.domElement);

    // helpers
    // GRID
    const grid = new THREE.GridHelper(1000, 1000, 0x000000);
    newScene.add(grid);
    // AXES
    const axesHelper = new THREE.AxesHelper(1000);
    newScene.add(axesHelper);
    // LIGHT
    const pointLightHelper = new THREE.PointLightHelper(light, 5);
    newScene.add(pointLightHelper);

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);
  };

  useEffect(() => {
    setup();
    if (!files.length) {
      getFiles();
    }
  }, []);

  useEffect(() => {
    if (camera && scene && renderer) {
      animate();
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
      };
    }
  }, [scene, camera, renderer]);

  useEffect(() => {
    load();
  }, [file]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-screen flex justify-center ${
          showMenu !== "None" ? "invisible md:visible" : ""
        }`}
      >
        {file !== "" && (
          <div className="flex border-indigo-900 border-b-4 border-l-4 border-r-4 bg-indigo-500/75 text-white text-2xl p-2 rounded-br-lg rounded-bl-lg">
            <div className="mx-4">{file}</div>
            {progress < 100 && (
              <div className="mx-4">{progress.toFixed(1)} %</div>
            )}
          </div>
        )}
      </div>
      {scene && renderer && (
        <Controls
          scene={scene}
          renderer={renderer}
          setIsAuthenticated={setIsAuthenticated}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
        />
      )}
      <File
        files={files}
        changeFile={(fileName) => {
          console.log(fileName);
          setFile(fileName);
        }}
        getFiles={getFiles}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
      <canvas ref={canvas} className="fixed top-0 left-0 -z-50"></canvas>
    </>
  );
};

export default Canvas;
