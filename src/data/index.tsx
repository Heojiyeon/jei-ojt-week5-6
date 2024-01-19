import { GameResult } from '@/types/problem';

type addIndexedDBProp = GameResult;

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
    db.createObjectStore('countOfCorrect');
  };

  /**
   * 저장소 내 에러 처리
   */
  request.onerror = e => console.error(e);
};

/**
 * 결과 저장하는 함수
 */
export const addIndexedDB = (result: addIndexedDBProp) => {
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
  request.onsuccess = e => {
    db = (e.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(['countOfCorrect'], 'readwrite');

    const countOfCorrectStore = transaction.objectStore('countOfCorrect');

    const handledResult = {
      order: JSON.stringify(result.order),
      count: JSON.stringify(result.count),
    };

    countOfCorrectStore.add(handledResult, result.order);
  };
};

/**
 * 결과 가져오는 함수
 */
export const getIndexedDB = () => {
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
      const problemStore = request.result
        .transaction(['countOfCorrect'])
        .objectStore('countOfCorrect');

      problemStore.getAll().onsuccess = e => {
        const result = (e.target as IDBOpenDBRequest).result;
        resolve(result);
      };
    };
  });
};
