import { openDB } from "idb";

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
});

export async function getData(key: string) {
  return (await dbPromise).get("keyval", key);
}
export async function setData(key: string, val: any) {
  return (await dbPromise).put("keyval", val, key);
}
export async function delData(key: string) {
  return (await dbPromise).delete("keyval", key);
}
export async function clearData() {
  return (await dbPromise).clear("keyval");
}
export async function getKeys() {
  return (await dbPromise).getAllKeys("keyval");
}
