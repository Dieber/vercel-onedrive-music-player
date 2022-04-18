// zustand store
import { Howl } from "howler";
import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import loadMusic from "../utils/loadMusic";
import { subscribeWithSelector } from "zustand/middleware";

import { modulo, __, compose, add } from "ramda";

export type PlayListData = Array<PlaylistItem>;

export type PlaylistItem = {
  src: string;
  id: string;
  name: string;
};

export type AudioData = {
  audio: Howl;
  fileName: string;
  title: string | null;
  artist: string | null;
  cover: any;
};

// type AudioData

type MusicStore = {
  playList: PlayListData | null;
  // downloadingCount: number;
  // clearDownloadingCount: () => void;

  liveItem: PlaylistItem | null;
  audioData: AudioData | null;
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

const useMusicStore = create<
  MusicStore,
  SetState<MusicStore>,
  GetState<MusicStore>,
  Mutate<StoreApi<MusicStore>, [["zustand/subscribeWithSelector", never]]>
>(
  // There are something wrong with zustand's type system, so ignore it temporarily.
  // @ts-ignore
  subscribeWithSelector((set, getter) => ({
    liveItem: null,
    audioData: null,
    playList: null,
    playerState: "stop",
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
      const { playList, play } = getter();
      const willPlayItem =
        playList?.find((it) => {
          return item === it;
        }) ?? null;

      if (!willPlayItem) {
        return;
      }

      set({
        liveItem: item,
        playerState: "loading",
      });

      // TODO: fix the sequence of async
      const audioData: AudioData = {
        ...(await loadMusic(willPlayItem)),
        fileName: item.name,
      };

      set({
        audioData,
      });
      play();
    },

    next: () => {
      const { playList, liveItem, load } = getter();
      if (!playList) {
        return;
      }
      const index = playList.findIndex((item) => {
        return item === liveItem;
      });
      const nextIndex = loopAdd(playList.length)(index);
      load(playList[nextIndex]);
    },

    prev: () => {
      const { playList, liveItem, load } = getter();
      if (!playList) {
        return;
      }
      const index = playList.findIndex((item) => {
        return item === liveItem;
      });
      const prevIndex = loopMinus(playList.length)(index);
      load(playList[prevIndex]);
    },

    pause: () => {
      set({
        playerState: "pause",
      });
    },
  }))
);

// side Effect in store
useMusicStore.subscribe(
  (state) => state.playerState,
  (playerState) => {
    const audio = useMusicStore.getState().audioData?.audio;
    if (!audio) {
      return;
    }

    switch (playerState) {
      case "play":
        audio.play();
        break;
      case "pause":
        audio.pause();
        break;
      case "loading":
        audio.stop();
        break;
      default:
        return;
    }
  }
);

useMusicStore.subscribe(
  (state) => state.audioData,
  (audioData, previousAudioData) => {
    if (audioData) {
      const audio = audioData.audio;
      audio.on("end", function () {
        audio.off("end");
        audio.off("load");
        useMusicStore.getState().next();
      });
    }

    // clear side effect from previous state
    previousAudioData?.audio.stop();
  }
);

export default useMusicStore;
