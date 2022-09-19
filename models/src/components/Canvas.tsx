import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Controls from "./Controls";

import URL0 from "../assets/Black XBOX controller.glb?url";
import URL1 from "../assets/P1.glb?url";
import URL2 from "../assets/2CylinderEngine.glb?url";

export const Canvas = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [loader, setLoader] = useState<GLTFLoader | null>(null);
  const [URL, setURL] = useState(URL0);

  const load = () => {
    if (loader && camera && renderer && scene) {
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
    if (camera && scene && renderer) {
      console.log("animate");
      load();
      function loop() {
        requestAnimationFrame(loop);
        if (scene && camera && renderer) {
          //   console.log("loop");
          renderer.render(scene, camera);
        }
      }
      loop();
    }
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
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [scene, camera, renderer]);

  useEffect(() => {}, []);

  return (
    <>
      {scene && <Controls scene={scene} />}
      <canvas ref={canvas} className="fixed top-0 left-0 -z-50"></canvas>;
    </>
  );
};
