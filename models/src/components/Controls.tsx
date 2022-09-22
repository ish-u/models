import { useState } from "react";
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

const Controls = ({
  scene,
  setIsAuthenticated,
}: {
  scene: THREE.Scene;
  setIsAuthenticated: (value: boolean) => void;
}) => {
  const [visible, setVisible] = useState<"visible" | "invisible">("invisible");
  const [hover, setHover] = useState(true);

  //helpers toggle
  const toggleGrid = () => {
    if (scene) {
      const objects = scene?.children;
      console.log(objects);
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
      console.log(objects.length);
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
      console.log(objects.length);
      objects.map((o) => {
        if (o.type === "PointLightHelper") {
          o.visible = !o.visible;
        }
      });
    }
  };

  const toggle = () => {
    console.log(visible);
    if (visible === "invisible") {
      setVisible("visible");
    } else {
      setVisible("invisible");
    }
  };

  return (
    <>
      <div
        className={`fixed ${
          visible === "visible" ? "visible" : "invisible"
        } w-screen md:w-3/6 lg:w-1/6 top-0 left-0 z-50 flex flex-col pt-14 pb-8 px-4
        bg-emerald-600/25 h-screen border-r-4 border-emerald-900`}
      >
        <div className="flex flex-col grow">
          <ControlButton title="Show Grid" toggle={toggleGrid} />
          <ControlButton title="Show Axes" toggle={toggleAxes} />
          <ControlButton title="Show Point Light" toggle={toggleLight} />
        </div>
        <div className="flex flex-col">
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </div>
        <div className="absolute -top-0 -right-0">
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
        } -top-0 border-r-4 border-b-4 ml-4 border-emerald-900`}
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
