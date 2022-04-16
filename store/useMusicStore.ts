// zustand store
import { Howl } from "howler";
import create, { SetState } from "zustand";
import { PlaylistItem, PlayListData } from "../components/PlayList";
import loadMusic from "../utils/loadMusic";

import { modulo, __, compose, add } from "ramda";

type MusicStore = {
  playList: PlayListData | null;
  // downloadingCount: number;
  // clearDownloadingCount: () => void;

  liveItem: PlaylistItem | null;
  audio: Howl | null;
  playerState: "loading" | "play" | "pause" | "stop";
  showList: boolean;

  setShowList: (show: boolean) => void;
  setPlayList: (data: PlayListData) => void;
  load: (itemId: PlaylistItem) => Promise<void>;
  pause: () => void;
  play: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
};

type ntn = (num: number) => number;

const loopAdd = (upper: number): ntn => compose(modulo(__, upper), add(1));
const loopMinus = (upper: number): ntn =>
  compose(modulo(__, upper), add(upper - 1));

const useMusicStore = create<MusicStore>((set, getter) => ({
  liveItem: null,
  audio: null,
  playerState: "stop",
  playList: null,
  showList: false,

  setShowList: (show: boolean) => {
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

  load: async (item: PlaylistItem) => {
    let { playList } = getter();
    let willPlayItem =
      playList?.find((it) => {
        return item === it;
      }) ?? null;

    if (!willPlayItem) {
      return;
    }

    set({
      liveItem: item,
      playerState: "loading",
      audio: null,
      // downloadingCount: getter().downloadingCount + 1,
    });

    // TODO: fix the sequence of async
    let audio: Howl = await loadMusic(willPlayItem);

    set({
      audio,
    });
  },

  next: () => {
    let { playList, liveItem, load } = getter();
    if (!playList) {
      return;
    }
    let index = playList.findIndex((item) => {
      return item === liveItem;
    });
    let nextIndex = loopAdd(playList.length)(index);
    load(playList[nextIndex]);
  },

  prev: () => {
    let { playList, liveItem, load } = getter();
    if (!playList) {
      return;
    }
    let index = playList.findIndex((item) => {
      return item === liveItem;
    });
    let prevIndex = loopMinus(playList.length)(index);
    load(playList[prevIndex]);
  },

  pause: () => {
    set({
      playerState: "pause",
    });
  },
}));

export default useMusicStore;
