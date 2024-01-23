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
import { getIndexedDB } from '@/data';
import { ContentTitle, GameResult, Games } from '@/types/problem';

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
  const getResults = async () => {
    const numberGameResult = (await getIndexedDB({
      gameType: 'number-game',
    })) as GameResult[];
    const situationGameResult = (await getIndexedDB({
      gameType: 'situation-game',
    })) as GameResult[];

    if (numberGameResult.length !== 0) {
      setNumberGameStatistic(prevStatistic => {
        return prevStatistic
          ? [...prevStatistic, ...numberGameResult]
          : [...numberGameResult];
      });
    }

    if (situationGameResult.length !== 0) {
      setSituationGameStatistic(prevStatistic => {
        return prevStatistic
          ? [...prevStatistic, ...situationGameResult]
          : [...situationGameResult];
      });
    }
  };

  // 메인 페이지 진입 시 게임 통계 자료 저장
  useEffect(() => {
    return () => {
      getResults();
    };
  }, []);

  return (
    <div className="grid grid-cols-4">
      <Sidebar onClick={handleMenu} />
      <div className="col-span-3">
        {contentTitle === 'game' && <GameList />}
        {contentTitle === 'statistics' && (
          <>
            <button
              onClick={() =>
                setTargetGameTitle(prevTargetGameTitle =>
                  prevTargetGameTitle === 'number-game'
                    ? 'situation-game'
                    : 'number-game'
                )
              }
            >
              <TbPlayerTrackNextFilled />
            </button>
            <Statistics targetGameTitle={targetGameTitle} />
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
