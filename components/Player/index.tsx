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
import useWindowInfo from "../../hooks/useWindowInfo";
// import useRaf from "../hooks/useRaf";

interface Props {
  audio?: Howl;
  audioUrl?: string;
  musicTitle?: string;
  onPause: () => void;
  onPlay: () => void;
}

const Player: React.FC<Props> = () => {
  const { audioData } = useMusicStore();

  const { innerHeight, innerWidth } = useWindowInfo();

  return (
    <Background>
      <StatusBar></StatusBar>
      <div className="main flex justify-center items-center absolute w-full h-full top-0 left-0">
        <div className="text-white text-center">
          <div>
            {audioData?.cover && innerWidth ? (
              <Cover
                className=" w-[200px] h-[200px] md:w-[300px] md:h-[300px]  rounded-[150px]"
                src={audioData.cover}
                alt={audioData.fileName}
                width={innerWidth > 640 ? 300 : 200}
                height={innerWidth > 640 ? 300 : 200}
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
