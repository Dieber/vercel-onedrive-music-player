// import

import { Howl } from "howler";
import { useEffect, useMemo, useRef, useState } from "react";
import useMusicStore from "../../store/useMusicStore";
import useThemeStore from "../../store/useThemeStore";
import { get } from "../../utils/fetcher";
import Icon from "../Basic/Icon";
import Background from "./Background";
import ControlPanel from "./ControlPanel";
import StatusBar from "./StatusBar";
import Image from "next/image";
import Cover from "./Cover";
// import useRaf from "../hooks/useRaf";

interface Props {
  audio?: Howl;
  audioUrl?: string;
  musicTitle?: string;
  onPause: () => void;
  onPlay: () => void;
}

const Player: React.FC<Props> = () => {
  let { audioData } = useMusicStore();

  return (
    <Background>
      <StatusBar></StatusBar>
      <div className="main flex justify-center items-center absolute w-full h-full top-0 left-0">
        <div className="text-white text-center">
          <div>
            {audioData?.cover ? (
              <Cover
                // className=""
                src={audioData.cover}
                alt={audioData.fileName}
                width={100}
                height={100}
              ></Cover>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ControlPanel></ControlPanel>
    </Background>
  );
};

export default Player;
