type createIndexedDBProp = {
  count: number;
};

export const createIndexedDB = ({ count }: createIndexedDBProp) => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
    return;
  }

  let db: IDBDatabase;
  const request = idxDB.open('content');

  /**
   * 저장소 내 objectStore 생성
   * 문제 타입 별 정답 개수 저장
   */
  request.onupgradeneeded = e => {
    db = (e.target as IDBOpenDBRequest).result;
    db.createObjectStore('countOfCorrect');
  };

  /**
   * 트랜잭션(DB 상태 변화) 핸들링
   */
  request.onsuccess = e => {
    db = (e.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(['countOfCorrect'], 'readwrite');

    const countOfCorrectStore = transaction.objectStore('countOfCorrect');

    if (count) {
      countOfCorrectStore.put(count, 'count');
    }
  };

  /**
   * 저장소 내 에러 처리
   */
  request.onerror = e => console.error(e);
};

export const getIndexedDB = () => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
    return;
  }

  return new Promise((resolve, reject) => {
    const request = idxDB.open('content');

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
        const problems = (e.target as IDBOpenDBRequest).result;

        resolve(problems);
      };
    };
  });
};
