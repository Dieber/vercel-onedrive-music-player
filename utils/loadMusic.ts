import { get as axiosGet } from "./fetcher";
import { get, set } from "./db";
import { Howl } from "howler";

import jsmediatags from "jsmediatags";
import useMusicStore, { AudioData, PlaylistItem } from "../store/useMusicStore";

type PictureData = {
  data: ArrayBuffer;
  type: string;
};

const getBlobFromTagsData = (pictureData: PictureData | null) => {
  // return
  if (!pictureData || !pictureData.data) {
    return null;
  }

  const { data, type } = pictureData;
  const byteArray = new Uint8Array(data);

  const blob = new Blob([byteArray], { type });
  return URL.createObjectURL(blob);
};

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

//

type AudioDataWithoutFileName = Omit<AudioData, "fileName">;

const loadMusic = (willPlayItem: PlaylistItem) => {
  return new Promise<AudioDataWithoutFileName>(async (resolve) => {
    let blob: Blob;
    let newArrayBuffer;
    let arrayBuffer = await get(willPlayItem.id);

    // get music from url or IndexedDB
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

    // get metadata of music from array buffer
    let tagsResult: any = await readTags(finalAB);
    let audioData = {
      title: tagsResult?.tags?.title,
      cover: getBlobFromTagsData(tagsResult?.tags?.picture ?? null),
      artist: tagsResult?.tags?.artist,
    };

    let url = URL.createObjectURL(blob);
    let audio = new Howl({
      src: [url],
      format: ["mp3"],
    });

    audio.on("load", () => {
      resolve({
        audio: audio,
        ...audioData,
      });
    });
  });
};
export default loadMusic;
