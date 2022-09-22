import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Controls from "./Controls";
import { Object3D } from "three";

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
  const [URL, setURL] = useState("");
  const [files, setFiles] = useState([]);

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

      const res = await fetch(import.meta.env.VITE_API_URL + "/file/" + URL, {
        credentials: "include",
      });
      const url = (await res.json()).url;

      loader.load(
        url,
        (gltf) => {
          gltf.scene.scale.set(10, 10, 10);
          scene.add(gltf.scene);
        },
        (progress) => console.log((progress.loaded / progress.total) * 100),
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
    newRenderer.setClearColor(0x0f0f0f, 1);

    // GLTF LOADER
    const gltfLoader = new GLTFLoader();
    setLoader(gltfLoader);

    // Adding the Camera
    newScene.add(newCamera);

    // Adding Lighting
    const light = new THREE.PointLight(0xffffff, 10);
    light.position.set(10, 10, 10);
    newScene.add(light);

    const ambLight = new THREE.AmbientLight(0x404040); // soft white light
    newScene.add(light);

    // Adding orbit controls
    const orbit = new OrbitControls(newCamera, newRenderer.domElement);

    // helpers
    // GRID
    const grid = new THREE.GridHelper(1000, 1000);
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
  }, [URL]);

  return (
    <>
      {scene && (
        <Controls scene={scene} setIsAuthenticated={setIsAuthenticated} />
      )}
      <File
        files={files}
        changeFile={(file) => {
          console.log(file);
          setURL(file);
        }}
        getFiles={getFiles}
      />
      <canvas ref={canvas} className="fixed top-0 left-0 -z-50"></canvas>
    </>
  );
};

export default Canvas;
