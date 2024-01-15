import { ReactNode } from 'react';
import Header from './Header';

type LayoutProp = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return (
    <div className=" w-800 h-500">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
