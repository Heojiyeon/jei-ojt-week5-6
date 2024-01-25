import { Games } from '@/types/problem';

import Button from './common/Button';

type ResultProp = {
  currentElapsedTime: string;
  countOfCorrect: number;
  gameType: Games;
};

const Result = ({
  currentElapsedTime,
  countOfCorrect,
  gameType,
}: ResultProp) => {
  const score = 20 * countOfCorrect;
  const gameTitle =
    gameType === 'number-game' ? '숫자 맞추기 게임' : '상황 추론 게임';

  return (
    <div
      className="bg-[#FFF8F8] w-[350px] h-[450px] mt-40 flex flex-col 
    items-center border border-none rounded-lg"
    >
      <div className="flex flex-col items-center mt-14 mb-8 text-[18px]">
        <img src={`/images/${gameType}.png`} alt="게임이미지" />
        <div className="flex flex-col items-center m-4 pt-2">
          {gameTitle}을
          <div className="flex">
            <div className="text-[#FFA09C] font-bold">
              {parseFloat(currentElapsedTime).toFixed(2)}초
            </div>
            &nbsp; 플레이했어요.
          </div>
          <div className="m-4">
            총 5문제 중 {countOfCorrect} 문제를 맞춰
            <br />
            <div className="flex">
              <div className="text-[#FFA09C] font-bold">{score}점</div>으로
              게임을&nbsp;
              {score >= 50 ? '성공' : '실패'}했어요.
            </div>
          </div>
          <div>{score >= 50 ? '축하드려요!' : '조금 더 노력해봐요!'}</div>
        </div>
      </div>
      <Button
        content="메인으로 가기"
        onClick={() => window.location.replace('/main')}
        size="w-64 h-10"
        id="login"
      ></Button>
    </div>
  );
};

export default Result;
