import { MENUS } from '@/constants/menu';
import Profile from './Profile';
import Button from './common/Button';
import { ContentTitle } from '@/types/problem';

type SidebarProp = {
  onClick: (title: ContentTitle) => void;
};

const Sidebar = ({ onClick }: SidebarProp) => {
  const handleMenuButton = (title: ContentTitle) => {
    onClick(title);
  };
  return (
    <div className="col-span-1 flex-col">
      <div id="sidebar-profile">
        <Profile name={'허지연'} />
      </div>
      <div id="sidebar-buttons" className=" flex flex-col">
        {MENUS.map(menu => (
          <Button
            key={menu.id}
            content={menu.title}
            onClick={() => handleMenuButton(menu.id as ContentTitle)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
