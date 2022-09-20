import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Controls from "./Controls";

import URL0 from "../assets/Black XBOX controller.glb?url";
import URL1 from "../assets/P1.glb?url";
import URL2 from "../assets/2CylinderEngine.glb?url";
import { Object3D } from "three";

const ChangeFile = ({
  files,
  changeFile,
}: {
  files: string[];
  changeFile: (file: string) => void;
}) => {
  return (
    <select
      className="fixed top-4 right-4 p-1 m-1 my-2 z-10 text-white text-lg font-bold
      bg-emerald-500/50 hover:bg-emerald-500 transition duration-300 border border-emerald-400 rounded-md"
      id="device"
      name="device"
      defaultValue={"DEFAULT"}
      onChange={(e) => changeFile(e.target.value)}
    >
      <option value="DEFAULT" disabled>
        Choose File
      </option>
      {files.map((file) => (
        <option key={file} value={file}>
          {file}
        </option>
      ))}
    </select>
  );
};

const Canvas = ({ files }: { files: string[] }) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [loader, setLoader] = useState<GLTFLoader | null>(null);
  const [URL, setURL] = useState("");

  const load = () => {
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

      loader.load(
        URL,
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
      {scene && <Controls scene={scene} />}
      <canvas ref={canvas} className="fixed top-0 left-0 -z-50"></canvas>
      <ChangeFile
        files={files}
        changeFile={(file) => {
          console.log(file);
          setURL("http://localhost:5000/" + file);
        }}
      />
    </>
  );
};

export default Canvas;
