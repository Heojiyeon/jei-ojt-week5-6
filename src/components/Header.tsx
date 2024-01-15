type HeaderProp = {
  title?: string;
};

const Header = ({ title }: HeaderProp) => {
  return <div className="bg-red w-full h-14">{title}</div>;
};

export default Header;
