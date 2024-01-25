type ButtonProp = {
  content: string;
  size: string;
  onClick: () => void;
};

const Button = ({ content, size, onClick }: ButtonProp) => {
  return (
    <button
      className={`${size} border border-none rounded-full bg-[#E5001A] text-[#ffffff]`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
