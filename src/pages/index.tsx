import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';

import {
  numberGameStatisticAtom,
  situationGameStatisticAtom,
} from '@/atoms/statistics';
import GameList from '@/components/GameList';
import Sidebar from '@/components/Sidebar';
import Statistics from '@/components/Statistic';
import { ContentTitle, Games } from '@/types/problem';

const MainPage = () => {
  const [contentTitle, setContentTitle] = useState<ContentTitle>('game');
  const [targetGameTitle, setTargetGameTitle] = useState<Games>('number-game');

  const setNumberGameStatistic = useSetAtom(numberGameStatisticAtom);
  const setSituationGameStatistic = useSetAtom(situationGameStatisticAtom);

  const handleMenu = (title: ContentTitle) => {
    setContentTitle(title);
  };

  /**
   * 결과 데이터 불러오는 함수
   */
  const getResult = async (gameType: Games) => {
    const response = await axios.get(`/result/${gameType}`);

    return response.data;
  };

  const { data: numberData } = useQuery({
    queryKey: ['numberGameResult'],
    queryFn: () => getResult('number-game'),
  });

  const { data: situationData } = useQuery({
    queryKey: ['situationGameResult'],
    queryFn: () => getResult('situation-game'),
  });

  // 메인 페이지 진입 시 게임 통계 자료 저장
  useEffect(() => {
    if (numberData && situationData) {
      const numberGameResult = numberData;
      const situationGameResult = situationData;

      if (numberGameResult.length !== 0) {
        setNumberGameStatistic(prevStatistic => {
          return prevStatistic
            ? [...prevStatistic, ...numberGameResult]
            : [...numberGameResult];
        });
      } else {
        setNumberGameStatistic([]);
      }

      if (situationGameResult.length !== 0) {
        setSituationGameStatistic(prevStatistic => {
          return prevStatistic
            ? [...prevStatistic, ...situationGameResult]
            : [...situationGameResult];
        });
      } else {
        setSituationGameStatistic([]);
      }
    }
  }, [
    numberData,
    setNumberGameStatistic,
    setSituationGameStatistic,
    situationData,
  ]);

  return (
    <div className="grid grid-cols-4 h-[800px] ">
      <Sidebar onClick={handleMenu} />
      <div className="col-span-3 bg-[#FFF8F8] w-[70vw] h-[80vh] mt-8 p-16">
        {contentTitle === 'game' && <GameList />}
        {contentTitle === 'statistics' && (
          <div>
            <div className="flex justify-end">
              <button
                onClick={() =>
                  setTargetGameTitle(prevTargetGameTitle =>
                    prevTargetGameTitle === 'number-game'
                      ? 'situation-game'
                      : 'number-game'
                  )
                }
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                {targetGameTitle === 'number-game'
                  ? '상황 추론 게임 통계'
                  : '숫자 맞추기 게임 통계'}
                &nbsp;
                <TbPlayerTrackNextFilled />
              </button>
            </div>
            <Statistics targetGameTitle={targetGameTitle} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
