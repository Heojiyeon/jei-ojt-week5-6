import Button from './common/Button';

type ResultProp = {
  countOfCorrect: number;
};

const Result = ({ countOfCorrect }: ResultProp) => {
  const score = 20 * countOfCorrect;

  return (
    <div>
      <div>
        총 5문제 중 {countOfCorrect} 문제를 맞춰 {20 * countOfCorrect}점으로
        게임을 {score >= 50 ? '성공' : '실패'}했어요.
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
