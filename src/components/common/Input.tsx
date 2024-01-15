import { useState } from 'react';

type InputProp = {
  id: string;
  type: string;
  size: string;
};

const Input = ({ id, type, size }: InputProp) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <input
      id={id}
      type={type}
      className={`container ${size}`}
      onClick={() => setIsSelected(true)}
    />
  );
};

export default Input;
