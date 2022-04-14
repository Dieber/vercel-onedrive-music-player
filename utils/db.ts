// import { IDBPDatabase, openDB } from "idb";

import { openDB } from "idb";

//
const dbPromise: any =
  typeof window === "undefined"
    ? () => {}
    : openDB("keyval-store", 1, {
        upgrade(db: any) {
          db.createObjectStore("keyval");
        },
      });

// TODO: add LRU

export async function get(key: string) {
  return (await dbPromise).get("keyval", key);
}
export async function set(key: string, val: ArrayBuffer) {
  return (await dbPromise).put("keyval", val, key);
}
export async function del(key: string) {
  return (await dbPromise).delete("keyval", key);
}
export async function clear() {
  return (await dbPromise).clear("keyval");
}
export async function keys() {
  return (await dbPromise).getAllKeys("keyval");
}
