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

const Controls = ({ scene }: { scene: THREE.Scene }) => {
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

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col">
      <ControlButton title="Show Grid" toggle={toggleGrid} />
      <ControlButton title="Show Axes" toggle={toggleAxes} />
      <ControlButton title="Show Point Light" toggle={toggleLight} />
    </div>
  );
};

export default Controls;
