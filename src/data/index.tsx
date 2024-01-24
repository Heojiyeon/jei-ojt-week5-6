import { GameResult, Games } from '@/types/problem';

export const createIndexedDB = () => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
    return;
  }

  let db: IDBDatabase;
  const request = idxDB.open('result');

  /**
   * 저장소 내 objectStore 생성
   * 문제 타입 별 정답 개수 저장
   */
  request.onupgradeneeded = e => {
    db = (e.target as IDBOpenDBRequest).result;
    db.createObjectStore('number-game-result');
    db.createObjectStore('situation-game-result');
  };

  /**
   * 저장소 내 에러 처리
   */
  request.onerror = e => console.error(e);
};

/**
 * 결과 저장하는 함수
 */
type addIndexedDBProp = {
  gameType: string;
  result: GameResult;
};

// 결과 데이터 저장
export const addIndexedDB = ({ gameType, result }: addIndexedDBProp) => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
    return;
  }

  let db: IDBDatabase;
  const request = idxDB.open('result');
  /**
   * 트랜잭션(DB 상태 변화) 핸들링
   */
  const createResultByGameType = (gameType: Games) => {
    const transaction = db.transaction([`${gameType}-result`], 'readwrite');
    const gameResultStore = transaction.objectStore(`${gameType}-result`);

    const handledResult = {
      order: JSON.stringify(result.order),
      count: JSON.stringify(result.count),
      elapsedTime: result.elapsedTime,
    };

    gameResultStore.add(handledResult, result.order);
  };

  request.onsuccess = e => {
    db = (e.target as IDBOpenDBRequest).result;

    switch (gameType) {
      case 'number-game':
        createResultByGameType('number-game');
        break;
      case 'situation-game':
        createResultByGameType('situation-game');
        break;

      default:
        break;
    }
  };
};

/**
 * 결과 가져오는 함수
 */
type getIndexedDBProp = {
  gameType: string;
};

export const getIndexedDB = ({ gameType }: getIndexedDBProp) => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
    return;
  }

  return new Promise((resolve, reject) => {
    const request = idxDB.open('result');

    /**
     * 저장소 내 에러 처리
     */
    request.onerror = e => {
      console.error(e);
      reject((e.target as IDBOpenDBRequest).error);
    };

    /**
     * 트랜잭션(DB 상태 변화) 핸들링
     */
    request.onsuccess = () => {
      if (gameType === 'number-game') {
        const resultStore = request.result
          .transaction(['number-game-result'])
          .objectStore('number-game-result');

        resultStore.getAll().onsuccess = e => {
          const result = (e.target as IDBOpenDBRequest).result;
          resolve(result);
        };
      } else if (gameType === 'situation-game') {
        const resultStore = request.result
          .transaction(['situation-game-result'])
          .objectStore('situation-game-result');

        resultStore.getAll().onsuccess = e => {
          const result = (e.target as IDBOpenDBRequest).result;
          resolve(result);
        };
      }
    };
  });
};
