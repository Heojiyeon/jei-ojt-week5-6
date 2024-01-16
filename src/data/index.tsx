export const createIndexedDB = () => {
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
  };

  /**
   * 저장소 내 에러 처리
   */
  request.onerror = e => console.error(e);
};
