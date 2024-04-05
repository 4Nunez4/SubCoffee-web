import react from "React"

const InputForm = React.forwardRef(({ placeholder, type }, ref) => {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type={type}
        ref={ref}
        required
        className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer"
      />
    </div>
  );
});

export default InputForm;