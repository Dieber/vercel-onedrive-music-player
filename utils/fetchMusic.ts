import { PlaylistItem } from "../components/PlayList";
import { get, set } from "./db";
import { get as axiosGet } from "./fetcher";

const fetchMusic = async (willPlayItem: PlaylistItem) => {
  console.log(12312313121231232);
  let blob: Blob;

  let ab = await get(willPlayItem.src);

  if (ab) {
    blob = new Blob([ab], { type: "audio/mpeg" });
  } else {
    blob = await axiosGet(willPlayItem.src, {
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {},
    }).then((res: any) => {
      set(willPlayItem.id, res);
      return new Blob([res.data], { type: "audio/mpeg" });
    });
  }

  return blob;
};
export default fetchMusic;
