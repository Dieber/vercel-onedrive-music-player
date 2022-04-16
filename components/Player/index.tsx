// import

import { Howl } from "howler";
import { useEffect, useMemo, useRef, useState } from "react";
import useMusicStore from "../../store/useMusicStore";
import useThemeStore from "../../store/useThemeStore";
import { get } from "../../utils/fetcher";
import { ThemeMap } from "../Button";
import Icon from "../Icon";
import Background from "./Background";
import ControlPanel from "./ControlPanel";
import StatusBar from "./StatusBar";
// import useRaf from "../hooks/useRaf";

interface Props {
  audio?: Howl;
  audioUrl?: string;
  musicTitle?: string;
  onPause: () => void;
  onPlay: () => void;
}

const Player: React.FC<Props> = ({ musicTitle }) => {
  return (
    <Background>
      <StatusBar></StatusBar>
      <div className="main"></div>
      <ControlPanel></ControlPanel>
    </Background>
  );
};

export default Player;
