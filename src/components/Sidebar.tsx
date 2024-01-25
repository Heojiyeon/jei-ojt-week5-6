import { useSetAtom } from 'jotai';

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

  const handleMenuButton = (id: ContentTitle) => {
    setMenu(id);
    onClick(id);
  };
  return (
    <div className="h-[80vh] col-span-1 flex-col items-center m-8 p-8 border-r border-soli border-[#E3E3E3]">
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
    </div>
  );
};

export default Sidebar;
