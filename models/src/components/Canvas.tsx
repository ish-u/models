import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const Canvas = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  //helpers toggle
  const toggleGrid = () => {
    if (scene) {
      const objects = scene?.children;
      console.log(objects.length);
      objects.map((o) => {
        if (o.type === "GridHelper") {
          o.visible = !o.visible;
        }
      });
      
    }
  };

  const animate = () => {
    if (camera && scene && renderer) {
      console.log("animate");

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00f0f0 });
      const cube = new THREE.Mesh(geometry, material);
      scene?.add(cube);
      camera.position.z = 5;

      function loop() {
        requestAnimationFrame(loop);
        if (scene && camera && renderer) {
          //   console.log("loop");
          //   cube.rotation.x += 0.01;
          //   cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
      }
      loop();
    }
  };

  const setup = () => {
    // SCENE
    const newScene = new THREE.Scene();

    // CAMERA
    const newCamera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // RENDERER
    const newRenderer = new THREE.WebGLRenderer({
      canvas: canvas.current as HTMLCanvasElement,
    });
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.setClearColor(0x0f0f0f, 1);

    // Adding the Camera
    newScene.add(newCamera);

    // Adding orbit controls
    const orbit = new OrbitControls(newCamera, newRenderer.domElement);

    const grid = new THREE.GridHelper(1000, 1000);
    newScene.add(grid);

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);
  };

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    animate();
  }, [scene, camera, renderer]);

  return (
    <>
      <button
        className="fixed top-4 left-4 p-2 m-2 z-10 text-white text-lg font-bold
                 bg-emerald-500/50 hover:bg-emerald-500 transition duration-300 border border-emerald-400 rounded-md"
        onClick={toggleGrid}
      >
        Toggle Grid
      </button>
      <canvas ref={canvas} className="fixed top-0 left-0 -z-50"></canvas>;
    </>
  );
};
