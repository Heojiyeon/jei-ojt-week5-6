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
import { GameResult, Games } from '@/types/problem';

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

  const [currentTargetStatistic, setCurrentTargetStatistic] = useState<
    GameResult[] | null
  >(null);

  useEffect(() => {
    const setTargetData = (gameTitle: string) => {
      // 초기화
      setCurrentLabels(null);
      setCurrentCount(null);
      setCurrentElapsedTime(null);
      setCurrentTargetStatistic(null);

      const targetStatistic =
        gameTitle === 'number-game'
          ? numberGameStatistic
          : situationGameStatistic;

      if (targetStatistic !== undefined) {
        // 값이 빈 경우
        if (targetStatistic?.length === 0) {
          return;
        }

        setCurrentTargetStatistic(targetStatistic);

        targetStatistic?.map(statistic => {
          const { count, order, elapsedTime } = statistic;

          setCurrentLabels(prevLabels => {
            const handledLabel = Number(order) + 1 + '회 차';
            return prevLabels ? [...prevLabels, handledLabel] : [handledLabel];
          });

          setCurrentCount(prevCounts => {
            return prevCounts
              ? [...prevCounts, Number(count) * 20]
              : [Number(count) * 20];
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
    <div className="mt-12">
      <div className="flex justify-center items-center">
        {countData && (
          <Bar
            data={countData}
            options={{
              responsive: false,
              devicePixelRatio: 4,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 10,
                    },
                  },
                },
              },
              scales: {
                y: {
                  suggestedMin: 0,
                  suggestedMax: 100,
                },
              },
            }}
            style={{
              position: 'relative',
              height: '38vh',
              width: '28vw',
              margin: '1rem',
            }}
          />
        )}
        {timeData && (
          <Line
            data={timeData}
            options={{
              responsive: false,
              devicePixelRatio: 4,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 10,
                    },
                  },
                },
              },
              scales: {
                y: {
                  suggestedMin: 0,
                  suggestedMax: 100,
                },
              },
            }}
            style={{
              position: 'relative',
              height: '38vh',
              width: '28vw',
              margin: '1rem',
            }}
          />
        )}
      </div>

      {!currentTargetStatistic ? (
        <div className="text-[18px] flex flex-col items-center mt-16 opacity-80">
          <img src="/images/no-result.png" alt="포이 이미지" />
          <div className="mt-8 text-[#FFA09C]">
            아직 게임을 진행하지 않았어요..
          </div>
        </div>
      ) : (
        <div className="text-[18px] flex flex-col items-center mt-16">
          <div className="flex">
            {targetGameTitle === 'number-game'
              ? '숫자 맞추기 게임'
              : '상황 추론 게임'}
            을&nbsp;
            <div className=" text-[#FFA09C] font-bold">
              총 {currentCount && currentCount?.length}번,{' '}
              {currentElapsedTime
                ?.reduce((a, b) => Number(a) + Number(b))
                ?.toFixed(2)}
              초&nbsp;
            </div>
            플레이 했어요.
          </div>
          가장 높은 점수는 {currentCount && Math.max(...currentCount)}
          점이에요.
        </div>
      )}
    </div>
  );
};

export default Statistics;
