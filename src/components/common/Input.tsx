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
      className={`container ${size}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default Input;
