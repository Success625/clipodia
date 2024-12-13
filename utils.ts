interface DBItem<T> {
  id?: number;
  value: T;
  expiry: number;
}

function openDatabase(dbName: string, storeName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(dbName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) =>
      resolve((event.target as IDBOpenDBRequest).result);
    request.onerror = (event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
}

function storeDataWithExpiry<T>(
  db: IDBDatabase,
  storeName: string,
  value: T,
  ttl: number = 1000 * 60 * 20
): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    const expiry = new Date().getTime() + ttl;
    const item: DBItem<T> = { value, expiry };

    const request = store.add(item);
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
}

function getDataWithExpiry<T>(
  db: IDBDatabase,
  storeName: string
): Promise<DBItem<T>[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const now = new Date().getTime();
      const validItems = (request.result as DBItem<T>[]).filter(
        (item) => item.expiry > now
      );
      resolve(validItems);
    };

    request.onerror = (event) => reject((event.target as IDBRequest).onerror);
  });
}
function getAllData<T>(
  db: IDBDatabase,
  storeName: string
): Promise<DBItem<T>[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = request.result.map((item) => item as DBItem<T>);
      resolve(items);
    };

    request.onerror = (event) =>
      reject((event.target as IDBOpenDBRequest).onerror);
  });
}

export { openDatabase, storeDataWithExpiry, getDataWithExpiry, getAllData };
export type { DBItem };
