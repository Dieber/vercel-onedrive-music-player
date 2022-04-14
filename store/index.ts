// zustand store
import create, { SetState } from "zustand";
import { PlaylistItem, PlayListData } from "../components/PlayList";
import { get } from "../utils/fetcher";
import fetchMusic from "../utils/fetchMusic";

type MusicStore = {
  playList: PlayListData | null;
  // downloadedPool: Array<string>;
  downloadingCount: number;
  setPlayList: (data: PlayListData) => void;
  liveItemId: string | null;
  livingAudioUrl: string | null;
  pause: () => void;
  play: () => void;
  stop: () => void;
  load: (itemId: string) => Promise<void>;
  clearDownloadingCount: () => void;
  blob: Blob | null;
  playerState: "load" | "play" | "pause" | "stop";
  showList: boolean;
  setShowList: (show: boolean) => void;
};

const useMusicStore = create<MusicStore>((set, getter) => ({
  liveItemId: null,
  // downloadedPool: [],
  downloadingCount: 0,

  playerState: "stop",
  playList: null,
  livingAudioUrl: null,
  showList: false,
  blob: null,

  clearDownloadingCount: () => {
    set({
      downloadingCount: 0,
    });
  },

  setShowList: (show: boolean) => {
    console.log("123123");
    set({
      showList: show,
    });
  },
  setPlayList: (playList: PlayListData) => {
    set({
      playList,
    });
  },

  play: () => {
    set({
      playerState: "play",
    });
  },

  stop: () => {
    set({
      playerState: "stop",
    });
  },

  load: async (itemId: string) => {
    let playList = getter().playList;
    let willPlayItem =
      playList?.find((item) => {
        return item.id === itemId;
      }) ?? null;

    if (!willPlayItem) {
      return;
    }

    set({
      playerState: "load",
      downloadingCount: getter().downloadingCount + 1,
    });

    let blob = await fetchMusic(willPlayItem);

    // let blob = await get(willPlayItem.src, {
    //   responseType: "arraybuffer",
    //   onDownloadProgress: (progressEvent) => {},
    // }).then((res: any) => {
    //   return new Blob([res.data], { type: "audio/mpeg" });
    // });

    let url = URL.createObjectURL(blob);

    set({
      liveItemId: itemId,
      livingAudioUrl: url,
    });
  },

  next: () => {
    // liveItemId
    // let playingItem =
    //   playList?.find((item) => {
    //     return item.id === liveItemId;
    //   }) ?? null;
  },

  pause: () => {
    set({
      playerState: "pause",
    });
    // set({ bears: 0 })
  },
}));

export default useMusicStore;
