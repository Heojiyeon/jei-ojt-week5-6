type ButtonProp = {
  content: string;
  onClick: () => void;
};

const Button = ({ content, onClick }: ButtonProp) => {
  return <button onClick={onClick}>{content}</button>;
};

export default Button;
