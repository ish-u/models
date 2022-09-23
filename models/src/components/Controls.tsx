import { useEffect, useState } from "react";
import Logout from "./Logout";

const ControlButton = ({
  title,
  toggle,
}: {
  title: string;
  toggle: () => void;
}) => {
  return (
    <button
      className="p-1 m-1 my-2 z-10 text-white text-lg font-bold
                 bg-emerald-500/50 hover:bg-emerald-500/75 transition duration-300 border border-emerald-400 rounded-md"
      onClick={toggle}
    >
      {title}
    </button>
  );
};

const ChangeRendererColor = ({
  renderer,
}: {
  renderer: THREE.WebGLRenderer;
}) => {
  return (
    <div className="">
      <div className=" m-1 p-1 flex items-center justify-evenly bg-emerald-500/50 hover:bg-emerald-500/75 transition duration-300 border border-emerald-400 rounded-md">
        <div className="text-white font-bold text-lg">Set Render Color</div>
        <div className="flex justify-center items-center ml-2">
          <input
            className="w-8 h-8 rounded-md"
            type="color"
            defaultValue="#0f0f0f"
            onChange={(e) => {
              renderer.setClearColor(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const AmbientLigthControls = ({ scene }: { scene: THREE.Scene }) => {
  const [light, setLight] = useState<THREE.AmbientLight | null>(null);
  useEffect(() => {
    const getLight = () => {
      scene.children.map((o) => {
        if (o.type === "AmbientLight") {
          setLight(o as THREE.AmbientLight);
        }
      });
    };

    getLight();
  }, []);

  return (
    <div
      className="p-1 m-1 my-2 z-10 text-white text-lg font-bold flex flex-col items-center
bg-emerald-500/50 hover:bg-emerald-500/75 transition duration-300 border border-emerald-400 rounded-md"
    >
      <div>Ambient Light </div>
      <div className="w-full flex flex-col items-center mb-2">
        <div className="mx-2 mb-1">Intensity</div>
        <input
          className="w-5/6"
          type="range"
          defaultValue="1"
          onChange={(e) => {
            if (light) {
              light.intensity = parseInt(e.target.value);
            }
          }}
        />
      </div>
      <div className="w-full flex justify-center my-2">
        <div className="text-white font-bold text-lg">Set Color</div>
        <div className="flex justify-center items-center ml-2">
          <input
            className="w-8 h-8 rounded-md"
            type="color"
            defaultValue="#404040"
            onChange={(e) => {
              light?.color.setHex(
                parseInt("0x" + e.target.value.split("#")[1])
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

const PointLightControls = ({ scene }: { scene: THREE.Scene }) => {
  const [light, setLight] = useState<THREE.PointLight | null>(null);
  useEffect(() => {
    const getLight = () => {
      scene.children.map((o) => {
        if (o.type === "PointLight") {
          setLight(o as THREE.PointLight);
        }
      });
    };

    getLight();
  }, []);

  return (
    <div
      className="p-1 m-1 my-2 z-10 text-lg font-bold flex flex-col items-center text-white
bg-emerald-500/50 hover:bg-emerald-500/75 transition duration-300 border border-emerald-400 rounded-md"
    >
      <div className="my-1">Point Light Position</div>
      <div className="flex flex-col w-24 text-semibold text-black">
        <input
          className="outline-none m-1 p-1 rounded-md"
          type="number"
          defaultValue="5"
          placeholder="X"
          onChange={(e) => {
            light?.position.setX(parseInt(e.target.value));
          }}
        />
        <input
          className="outline-none m-1 p-1 rounded-md"
          type="number"
          defaultValue="5"
          placeholder="Y"
          onChange={(e) => {
            light?.position.setY(parseInt(e.target.value));
          }}
        />
        <input
          className="outline-none m-1 p-1 rounded-md"
          type="number"
          defaultValue="5"
          placeholder="Z"
          onChange={(e) => {
            light?.position.setZ(parseInt(e.target.value));
          }}
        />
      </div>
      <div className="w-full flex justify-center my-2">
        <div className="text-white font-bold text-lg">Set Color</div>
        <div className="flex justify-center items-center ml-2">
          <input
            className="w-8 h-8 rounded-md"
            type="color"
            defaultValue="#0f0f0f"
            onChange={(e) => {
              light?.color.setHex(
                parseInt("0x" + e.target.value.split("#")[1])
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Controls = ({
  scene,
  renderer,
  setIsAuthenticated,
  showMenu,
  setShowMenu,
}: {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  setIsAuthenticated: (value: boolean) => void;
  showMenu: string;

  setShowMenu: (value: "File" | "Control" | "None") => void;
}) => {
  const [visible, setVisible] = useState<"visible" | "invisible">("invisible");
  const [hover, setHover] = useState(true);

  //helpers toggle
  const toggleGrid = () => {
    if (scene) {
      const objects = scene?.children;
      objects.map((o) => {
        if (o.type === "GridHelper") {
          o.visible = !o.visible;
        }
      });
    }
  };

  // toggle axes
  const toggleAxes = () => {
    if (scene) {
      const objects = scene?.children;
      objects.map((o) => {
        if (o.type === "AxesHelper") {
          o.visible = !o.visible;
        }
      });
    }
  };

  const toggleLight = () => {
    if (scene) {
      const objects = scene?.children;
      objects.map((o) => {
        if (o.type === "PointLightHelper") {
          o.visible = !o.visible;
        }
        if (o.type === "PointLight") {
          o.visible = !o.visible;
        }
      });
    }
  };

  const toggle = () => {
    if (visible === "invisible") {
      setVisible("visible");
      setShowMenu("Control");
    } else {
      setVisible("invisible");
      setShowMenu("None");
    }
  };

  return (
    <>
      <div
        className={`fixed ${
          visible === "visible" ? "visible" : "invisible"
        } w-screen md:w-2/6 lg:w-1/6 top-0 left-0 z-50 flex flex-col justify-evenly px-4 pt-10
        bg-emerald-600/25 h-screen border-r-4 border-b-4 border-emerald-900 `}
      >
        <div className="flex flex-col grow">
          <ControlButton title="Toggle Grid" toggle={toggleGrid} />
          <ControlButton title="Toggle Axes" toggle={toggleAxes} />
          <ControlButton title="Toggle Point Light" toggle={toggleLight} />
          <ChangeRendererColor renderer={renderer} />
          <AmbientLigthControls scene={scene} />
          <PointLightControls scene={scene} />
        </div>
        <div className="flex flex-col h-1/6">
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </div>
        <div className="absolute top-0 left-0">
          <div
            className="hover:bg-emerald-500/60 p-1 font-bold text-white"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 font-semibold"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-10 left-0 ${
          visible !== "visible" ? "visible" : "invisible"
        } w-4 h-screen bg-emerald-600/50 border-r-4 border-emerald-900 ${
          hover ? "bg-emerald-600/75" : ""
        } ${
          showMenu === "File" && visible !== "visible"
            ? "invisible lg:visible"
            : ""
        }`}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={toggle}
      ></div>
      <div
        className={`fixed ${
          visible !== "visible" ? "visible" : "invisible"
        } top-0 left-0 w-4 h-10 bg-emerald-600/50 ${
          hover ? "bg-emerald-600/75" : ""
        } ${
          showMenu === "File" && visible !== "visible"
            ? "invisible lg:visible"
            : ""
        }`}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={toggle}
      ></div>
      <div
        className={`fixed ${
          visible !== "visible" ? "visible" : "invisible"
        } -top-0 border-r-4 border-b-4 ml-4 border-emerald-900 ${
          showMenu === "File" && visible !== "visible"
            ? "invisible lg:visible"
            : ""
        }`}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={toggle}
      >
        <div
          className={`flex text-white justify-center items-center pr-4 bg-emerald-600/50 h-10 font-bold text-xl ${
            hover ? "bg-emerald-600/75" : ""
          } ${
            showMenu === "File" && visible !== "visible"
              ? "invisible lg:visible"
              : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Controls;
