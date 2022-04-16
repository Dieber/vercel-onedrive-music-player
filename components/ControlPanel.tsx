// import

import { Howl } from "howler";
import { useEffect, useMemo, useRef, useState } from "react";
import useMusicStore from "../store/useMusicStore";
import { get } from "../utils/fetcher";
import Icon from "./Icon";
// import useRaf from "../hooks/useRaf";

interface Props {
  audio?: Howl;
  audioUrl?: string;
  musicTitle?: string;
  onPause: () => void;
  onPlay: () => void;
}

const mapIcons = {
  play: "pause",
  stop: "play",
  pause: "play",
  loading: "cloud-download",
};

const ControlPanel: React.FC<Props> = ({ musicTitle }) => {
  let { playerState, audio, pause, play, next, prev, setShowList } =
    useMusicStore();
  let [currentTime, setCurrentTime] = useState<number | null>(null);
  let [totalTime, setTotalTime] = useState<number | null>(null);

  // when audio is loaded
  useEffect(() => {
    if (!audio) {
      return;
    }
    play();

    audio.on("end", function () {
      pause();
    });

    setTotalTime(audio.duration());
    let raf = () => {
      if (audio) {
        setCurrentTime(audio.seek());
        requestAnimationFrame(raf);
      }
    };

    let id = requestAnimationFrame(raf);

    return () => {
      if (!audio) {
        return;
      }
      audio.stop();
      audio.off("end");
      audio.off("load");
      cancelAnimationFrame(id);
    };
  }, [audio, pause, play]);

  useEffect(() => {
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
      default:
        return;
    }
  }, [playerState, audio]);

  return (
    <div className="w-full h-full relative bg-gradient-to-bl from-green-400 to-blue-500 p-16">
      <div className="status-bar flex w-full justify-between text-5xl text-cyan-50 font-bold">
        <div>{currentTime?.toFixed(2) || "--:--"}</div>
        <div>{musicTitle!}</div>
        <div>{totalTime?.toFixed(2) || "--:--"}</div>
      </div>
      <div className="main"></div>
      <div className="control-bar flex absolute left-0 right-0 bottom-16 w-1/2 my-0 mx-auto justify-between text-cyan-50 text-5xl">
        <Icon name="audio-high"></Icon>
        <Icon
          name="previous"
          onClick={() => {
            prev();
          }}
        ></Icon>
        <Icon
          name={mapIcons[playerState]}
          onClick={() => {
            if (!audio) {
              return;
            }
            switch (playerState) {
              case "loading": {
                break;
              }
              case "play": {
                pause();
                break;
              }
              default: {
                play();
                break;
              }
            }
          }}
        ></Icon>
        <Icon
          name="next"
          onClick={() => {
            next();
          }}
        ></Icon>
        <Icon
          name="list"
          onClick={() => {
            setShowList(true);
          }}
        ></Icon>
      </div>
    </div>
  );
};

export default ControlPanel;
