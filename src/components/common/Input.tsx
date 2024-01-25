type InputProp = {
  id: string;
  type: string;
  size: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({ id, type, size, value, onChange }: InputProp) => {
  return (
    <input
      id={id}
      type={type}
      className={`${size} border rounded-full border-[#E3E3E3] outline-none focus:border-[#FFA09C] p-4`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default Input;
