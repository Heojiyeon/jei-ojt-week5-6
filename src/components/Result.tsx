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
    <div>
      <div>
        {gameTitle}을 {currentElapsedTime}초 플레이했어요.
      </div>
      <div>
        총 5문제 중 {countOfCorrect} 문제를 맞춰 {score}점으로 게임을{' '}
        {score >= 50 ? '성공' : '실패'}했어요.
        {score >= 50 ? '축하드려요!' : '조금 더 노력해봐요!'}
      </div>
      <Button
        content="메인으로 가기"
        onClick={() => window.location.replace('/main')}
      ></Button>
    </div>
  );
};

export default Result;
