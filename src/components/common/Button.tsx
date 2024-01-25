import { useAtomValue } from 'jotai';

import { menuAtom } from '@/atoms/menu';

type ButtonProp = {
  id?: string;
  content: string;
  size: string;
  onClick: () => void;
};

const Button = ({ id, content, size, onClick }: ButtonProp) => {
  const selectedMenu = useAtomValue(menuAtom);

  const selectedButtonStyle =
    'border rounded-full border-none bg-[#E5001A] text-[#ffffff]';
  const restButtonStyle =
    'border rounded-full bg-[#ffffff] border-solid border-[#E3E3E3] text-[#A5A5A5]';

  return (
    <button
      className={`${size} ${
        id === selectedMenu || id === 'login'
          ? selectedButtonStyle
          : restButtonStyle
      } 
      hover:cursor-pointer hover:scale-110 
      `}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
