import { Game } from '@/constants/game';

type BoxProp = {
  info: Game;
  onClick: (id: string) => void;
};

const Box = ({ info, onClick }: BoxProp) => {
  const { id, title } = info;

  return (
    <div onClick={() => onClick(id!)}>
      <img src={`/images/${id}.png`} alt="게임 이미지" />
      <div>{title}</div>
    </div>
  );
};
export default Box;
