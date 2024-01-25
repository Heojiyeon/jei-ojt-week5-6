import { useSetAtom } from 'jotai';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { menuAtom } from '@/atoms/menu';
import { MENUS } from '@/constants/menu';
import { ContentTitle } from '@/types/problem';

import Button from './common/Button';
import Profile from './Profile';

type SidebarProp = {
  onClick: (title: ContentTitle) => void;
};

const Sidebar = ({ onClick }: SidebarProp) => {
  const setMenu = useSetAtom(menuAtom);

  const navigate = useNavigate();

  const handleMenuButton = (id: ContentTitle) => {
    setMenu(id);
    onClick(id);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <div className="relative h-[80vh] col-span-1 justify-center m-8 border-r border-solid border-[#E3E3E3]">
      <div id="sidebar-profile" className="flex justify-center">
        <Profile name={'허지연'} />
      </div>
      <div id="sidebar-buttons" className=" flex flex-col items-center">
        {MENUS.map(menu => (
          <Button
            key={menu.id}
            id={menu.id}
            content={menu.title}
            size="w-[200px] h-[60px] text-[20px] m-3"
            onClick={() => handleMenuButton(menu.id as ContentTitle)}
          />
        ))}
      </div>
      <div className="flex justify-center align-center">
        <div
          className="flex justify-center items-center absolute bottom-0
        text-[20px] text-[#A5A5A5] hover:cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
          <IoIosLogOut />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
