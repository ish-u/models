const ChangeFile = ({
  files,
  changeFile,
}: {
  files: string[];
  changeFile: (file: string) => void;
}) => {
  return (
    <select
      className="fixed bottom-4 left-4 p-1 m-1 my-2 z-10 text-white text-lg font-bold
        bg-emerald-500/50 hover:bg-emerald-500 transition duration-300 border border-emerald-400 rounded-md"
      id="device"
      name="device"
      defaultValue={"DEFAULT"}
      onChange={(e) => changeFile(e.target.value)}
    >
      <option value="DEFAULT" disabled>
        Choose File
      </option>
      {files &&
        files.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
    </select>
  );
};

export default ChangeFile;
