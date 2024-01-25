import { Game } from '@/constants/game';

type BoxProp = {
  info: Game;
  onClick: (id: string) => void;
};

const Box = ({ info, onClick }: BoxProp) => {
  const { id, title } = info;

  return (
    <div
      className="parent group w-[180px] h-[180px] border border-solid rounded-lg border-[#E3E3E3] 
      flex flex-col justify-center items-center bg-[#ffffff] m-4 
      hover:cursor-pointer hover:border-[#FFA09C] hover:scale-110"
      onClick={() => onClick(id!)}
    >
      <img src={`/images/${id}.png`} alt="게임 이미지" />
      <div className="child mt-6 text-[18px] text-[#A5A5A5] group-hover:text-[#FFA09C]">
        {title}
      </div>
    </div>
  );
};
export default Box;
