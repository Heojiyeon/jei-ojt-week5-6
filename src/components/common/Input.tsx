type InputProp = {
  id: string;
  type: string;
  size: string;
};

const Input = ({ id, type, size }: InputProp) => {
  return <input id={id} type={type} className={`container ${size}`} />;
};

export default Input;
