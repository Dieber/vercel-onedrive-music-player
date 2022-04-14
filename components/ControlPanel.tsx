// import

import { Howl } from "howler";
import { useEffect, useMemo, useRef, useState } from "react";
import { get } from "../libs/fetcher";
import useMusicStore from "../store";
import Icon from "./Icon";

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
  load: "cloud-download",
};

const ControlPanel: React.FC<Props> = ({
  audioUrl,
  musicTitle,
  // currentTime,
  // totalTime,
  // musicTitle,
}) => {
  let { playerState, livingAudioUrl, pause, play, setShowList, stop } =
    useMusicStore();
  let [currentTime, setCurrentTime] = useState<number | null>(null);
  let [totalTime, setTotalTime] = useState<number | null>(null);

  let audio = useRef<Howl | null>(null);

  useEffect(() => {
    if (!livingAudioUrl) {
      return;
    }
    let howl = new Howl({
      src: [livingAudioUrl],
      format: ["mp3"],
    });

    howl.on("load", function () {
      setTotalTime(howl.duration());
      play();
    });

    howl.on("end", function () {
      pause();
    });

    audio.current = howl;

    let raf = () => {
      setCurrentTime(howl.seek());
      requestAnimationFrame(raf);
    };
    let id = requestAnimationFrame(raf);

    return () => {
      audio.current?.stop();
      howl.off("end");
      howl.off("load");
      cancelAnimationFrame(id);
    };
  }, [livingAudioUrl, pause, play]);

  useEffect(() => {
    if (!audio.current) {
      return;
    }

    if (playerState === "stop") {
      return;
      // audio.current.stop();
    } else if (playerState === "play") {
      audio.current.play();
    } else if (playerState === "pause") {
      audio.current.pause();
    } else {
    }
  }, [playerState]);

  // useEffect(() => {

  // }, [isPlaying]);

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
        <Icon name="previous"></Icon>

        <Icon
          name={mapIcons[playerState]}
          onClick={() => {
            if (!audio.current) {
              return;
            }
            switch (playerState) {
              case "load": {
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

        {/* {playerState === "play" ? (
          <Icon
            name="pause"
            onClick={() => {
              pause();
            }}
          ></Icon>
        ) : (
          <Icon
            name="play"
            onClick={() => {
              play();
            }}
          ></Icon>
        )} */}
        <Icon name="next"></Icon>
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
