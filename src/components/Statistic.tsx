import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import {
  numberGameStatisticAtom,
  situationGameStatisticAtom,
} from '@/atoms/statistics';
import { Games } from '@/types/problem';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string[] | string;
    backgroundColor?: string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

type StatisticsProp = {
  targetGameTitle: Games;
};

const Statistics = ({ targetGameTitle }: StatisticsProp) => {
  const numberGameStatistic = useAtomValue(numberGameStatisticAtom);
  const situationGameStatistic = useAtomValue(situationGameStatisticAtom);

  const [currentLabels, setCurrentLabels] = useState<string[] | null>(null);

  // 정답 개수
  const [currentCount, setCurrentCount] = useState<number[] | null>(null);
  const [countData, setCountData] = useState<ChartData | null>(null);

  // 소요 시간
  const [currentElapsedTime, setCurrentElapsedTime] = useState<number[] | null>(
    null
  );
  const [timeData, setTimeData] = useState<ChartData | null>(null);

  useEffect(() => {
    const setTargetData = (gameTitle: string) => {
      const targetStatistic =
        gameTitle === 'number-game'
          ? numberGameStatistic
          : situationGameStatistic;

      if (targetStatistic !== undefined) {
        // 초기화
        setCurrentLabels([]);
        setCurrentCount([]);
        setCurrentElapsedTime([]);

        targetStatistic?.map(statistic => {
          const { count, order, elapsedTime } = statistic;

          setCurrentLabels(prevLabels => {
            const handledLabel = Number(order) + 1 + '회 차';
            return prevLabels ? [...prevLabels, handledLabel] : [handledLabel];
          });

          setCurrentCount(prevCounts => {
            return prevCounts
              ? [...prevCounts, Number(count) * 20]
              : [Number(count)];
          });

          setCurrentElapsedTime(prevElapsedTime => {
            return prevElapsedTime
              ? [...prevElapsedTime, Number(elapsedTime)]
              : [Number(elapsedTime)];
          });
        });
      }
    };
    setTargetData(targetGameTitle);
  }, [targetGameTitle, numberGameStatistic, situationGameStatistic]);

  useEffect(() => {
    const handleCurrentData = () => {
      setCountData(null);
      setTimeData(null);
      // 데이터 생성
      if (currentCount && currentLabels) {
        setCountData({
          labels: currentLabels,
          datasets: [
            {
              label: '총 점수',
              data: currentCount,
              backgroundColor: ['#FFA09C'],
              borderColor: ['#FF726B'],
              borderWidth: 1,
            },
          ],
        });
      }

      if (currentElapsedTime && currentLabels) {
        setTimeData({
          labels: currentLabels,
          datasets: [
            {
              label: '소요 시간',
              data: currentElapsedTime,
              fill: false,
              backgroundColor: ['#FFA09C'],
              borderColor: ['#FF726B'],
              tension: 0.1,
              borderWidth: 1,
            },
          ],
        });
      }
    };
    handleCurrentData();
  }, [currentCount, currentLabels, currentElapsedTime]);

  return (
    <div>
      <div>
        {countData && (
          <Bar
            data={countData}
            options={{ responsive: false, devicePixelRatio: 4 }}
            style={{ position: 'relative', height: '30vh', width: '30vw' }}
          />
        )}
        {timeData && (
          <Line
            data={timeData}
            options={{ responsive: false, devicePixelRatio: 4 }}
            style={{ position: 'relative', height: '30vh', width: '30vw' }}
          />
        )}
      </div>
      <div className="text-[18px]">
        {targetGameTitle === 'number-game'
          ? '숫자 맞추기 게임'
          : '상황 추론 게임'}
        을 총{' '}
        <div>
          {currentCount && currentCount?.length}번,{' '}
          {currentElapsedTime
            ?.reduce((a, b) => Number(a) + Number(b))
            ?.toFixed(2)}
          초{' '}
        </div>
        플레이 했어요.
        <br /> 가장 높은 점수는 {currentCount && Math.max(...currentCount)}
        점이에요.
      </div>
    </div>
  );
};

export default Statistics;
