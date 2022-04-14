// zustand store
import create, { SetState } from "zustand";
import { PlaylistItem, PlayListData } from "../components/PlayList";
import { get } from "../libs/fetcher";

type MusicStore = {
  playList: PlayListData | null;
  setPlayList: (data: PlayListData) => void;
  liveItemId: string | null;
  livingAudioUrl: string | null;
  loadThenPlay: (itemId: string) => void;
  pause: () => void;
  play: () => void;
  stop: () => void;
  load: (itemId: string) => Promise<void>;
  blob: Blob | null;
  playerState: "load" | "play" | "pause" | "stop";
  showList: boolean;
  setShowList: (show: boolean) => void;
};

const useMusicStore = create<MusicStore>((set, getter) => ({
  liveItemId: null,
  playerState: "stop",
  playList: null,
  livingAudioUrl: null,
  showList: false,
  blob: null,
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

  load: async (itemId: any) => {
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
    });
    let blob = await get(willPlayItem.src, {
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {},
    }).then((res: any) => {
      return new Blob([res.data], { type: "audio/mpeg" });
    });

    set({
      liveItemId: itemId,
      livingAudioUrl: URL.createObjectURL(blob),
      // blob,
    });

    // return blob
  },

  next: () => {
    // liveItemId
    // let playingItem =
    //   playList?.find((item) => {
    //     return item.id === liveItemId;
    //   }) ?? null;
  },

  loadThenPlay: async (itemId) => {
    getter().load(itemId);
  },
  pause: () => {
    set({
      playerState: "pause",
    });
    // set({ bears: 0 })
  },
}));

export default useMusicStore;
