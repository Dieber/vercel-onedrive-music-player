import { PlaylistItem } from "../components/PlayList";
import { get as axiosGet } from "./fetcher";
import { get, set } from "./db";
import { Howl } from "howler";

import jsmediatags from "jsmediatags";
import useMusicStore from "../store/useMusicStore";

const readTags = (arrayBuffer: ArrayBuffer) => {
  let blob = new Blob([arrayBuffer]);

  return new Promise((resolve, reject) => {
    jsmediatags.read(blob, {
      onSuccess: function (tag) {
        resolve(tag);
      },
      onError: function (error) {
        reject(error);
      },
    });
  });
};

const loadMusic = (willPlayItem: PlaylistItem) => {
  return new Promise<Howl>(async (resolve) => {
    let blob: Blob;
    let newArrayBuffer;
    let arrayBuffer = await get(willPlayItem.id);

    if (arrayBuffer) {
      blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    } else {
      blob = await axiosGet(willPlayItem.src, {
        responseType: "arraybuffer",
        onDownloadProgress: (progressEvent) => {},
      }).then(async (res: any) => {
        newArrayBuffer = res.data;
        await set(willPlayItem.id, res.data);
        return new Blob([res.data], { type: "audio/mpeg" });
      });
    }
    let finalAB = arrayBuffer || newArrayBuffer;
    let tags = await readTags(finalAB);
    console.log(tags);
    let url = URL.createObjectURL(blob);
    let howl = new Howl({
      src: [url],
      format: ["mp3"],
    });

    howl.on("load", () => {
      useMusicStore.getState().play();
      resolve(howl);
    });

    howl.on("end", function () {
      howl.off("end");
      howl.off("load");
      useMusicStore.getState().next();
    });
  });
};
export default loadMusic;
