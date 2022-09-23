import { useState } from "react";
import ChangeFile from "./ChangeFile";
import Upload from "./Upload";

const File = ({
  files,
  changeFile,
  getFiles,
  showMenu,
  setShowMenu,
}: {
  files: string[];
  changeFile: (file: string) => void;
  getFiles: () => void;
  showMenu: string;
  setShowMenu: (value: "File" | "Control" | "None") => void;
}) => {
  const [visible, setVisible] = useState<"visible" | "invisible">("invisible");

  const toggle = () => {
    console.log(visible);
    if (visible === "invisible") {
      setVisible("visible");
      setShowMenu("File");
    } else {
      setVisible("invisible");
      setShowMenu("None");
    }
  };

  return (
    <>
      <div
        className={`${
          visible !== "visible" ? "visible" : "invisible"
        } fixed top-0 right-0 bg-emerald-500/75 hover:bg-emerald-500 hover:cursor-pointer border-emerald-900 text-white
         px-4 py-2 flex items-center border-l-4 border-b-4 rounded-bl-lg font-semibold  ${
           showMenu === "Control" ? "invisible md:visible" : ""
         }`}
        onClick={toggle}
      >
        <div className="flex items-center mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>
        <div className="text-2xl">Files</div>
      </div>

      <div
        className={`${
          visible === "visible" ? "visible" : "invisible"
        } fixed top-0 right-0 w-screen h-screen md:w-5/6 lg:w-[30%] bg-emerald-500/50`}
      >
        <ChangeFile files={files} changeFile={changeFile} toggle={toggle} />
        <div className="h-1/6 flex flex-col justify-center items-center">
          <Upload getFiles={getFiles} />
        </div>

        <div className="absolute top-0 right-4">
          <div
            className="hover:bg-emerald-500/60 p-1 font-bold text-white"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 font-semibold"
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
    </>
  );
};

export default File;
