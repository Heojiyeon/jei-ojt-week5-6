import { ReactNode } from 'react';
import Header from './Header';
import Providers from './Providers';

type LayoutProp = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return (
    <Providers>
      <div className=" w-800 h-500">
        <Header />
        {children}
      </div>
    </Providers>
  );
};

export default Layout;
