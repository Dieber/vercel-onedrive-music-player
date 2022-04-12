// import

import { Howl } from "howler";
import { useEffect, useState } from "react";
import Icon from "./Icon";

interface Props {
  audio?: Howl;
  audioUrl?: string;
  musicTitle?: string;
  onPause: () => void;
  onPlay: () => void;
}

const Player: React.FC<Props> = ({
  audioUrl,
  // currentTime,
  // totalTime,
  musicTitle,
}) => {
  let [currentTime, setCurrentTime] = useState<number | null>(null);
  let [totalTime, setTotalTime] = useState<number | null>(0);
  let [isPlaying, setIsPlaying] = useState(false);

  // console.log(audio?.duration(), "xxxx");

  useEffect(() => {
    if (!audioUrl) {
      setCurrentTime(null);
      setTotalTime(null);
      return;
    }

    let audio = new Howl({
      src: [audioUrl],
      format: ["mp3"],
    });

    audio.on("load", () => {
      setTotalTime(audio.duration());
    });

    const raf = () => {
      setCurrentTime(audio.seek());
      requestAnimationFrame(raf);
    };

    let id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      audio.off("load");
    };
  }, [audioUrl, isPlaying]);

  useEffect(() => {}, [isPlaying]);

  // useEffect(() => {

  // }, [isPlaying]);

  return (
    <div className="w-full h-full relative bg-gradient-to-bl from-green-400 to-blue-500 p-16">
      <div className="status-bar flex w-full justify-between text-5xl text-cyan-50 font-bold">
        <div>{currentTime?.toFixed(2) || "--:--"}</div>
        <div>{musicTitle}</div>
        <div>{totalTime?.toFixed(2) || "--:--"}</div>
      </div>
      <div className="main"></div>
      <div className="control-bar flex absolute left-0 right-0 bottom-16 w-1/2 my-0 mx-auto justify-between text-cyan-50 text-5xl">
        <Icon name="audio-high"></Icon>
        <Icon name="previous"></Icon>
        {isPlaying ? (
          <Icon
            name="pause"
            onClick={() => {
              audio && setIsPlaying(false);
            }}
          ></Icon>
        ) : (
          <Icon
            name="play"
            onClick={() => {
              audio && setIsPlaying(true);
            }}
          ></Icon>
        )}
        <Icon name="next"></Icon>
        <Icon name="list"></Icon>
      </div>
    </div>
  );
};

export default Player;
