const ChangeFile = ({
  files,
  changeFile,
  toggle,
}: {
  files: string[];
  changeFile: (file: string) => void;
  toggle: () => void;
}) => {
  return (
    <>
      <div className="text-4xl text-white font-bold text-center m-4">Files</div>
      <div className="flex flex-wrap text-white h-[75%] overflow-y-scroll">
        {files &&
          files.map((file) => {
            return (
              <div
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/2 flex justify-center items-center h-fit"
                key={file}
              >
                <div
                  className="w-40 h-40 flex flex-col items-center justify-around border-4 border-emerald-900 bg-emerald-800 
                  my-4 rounded-lg cursor-pointer"
                  onClick={() => {
                    changeFile(file);
                    toggle();
                  }}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-24 h-24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div className="m-2">{file}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChangeFile;
