import { useEffect, useState } from "react";
import useMusicStore from "../../store/useMusicStore";

const StatusBar: React.FC = () => {
  let { playerState, audio } = useMusicStore();
  let { pause, play } = useMusicStore();

  let [currentTime, setCurrentTime] = useState<number | null>(null);
  let [totalTime, setTotalTime] = useState<number | null>(null);

  // when audio is loaded
  useEffect(() => {
    if (!audio) {
      return;
    }

    setTotalTime(audio.duration());
    let raf = () => {
      if (audio) {
        setCurrentTime(audio.seek());
        requestAnimationFrame(raf);
      }
    };

    let id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [audio]);

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
    <div className="status-bar p-24 flex w-full justify-between text-5xl text-cyan-50 font-bold">
      <div>{currentTime?.toFixed(2) || "--:--"}</div>
      <div>{totalTime?.toFixed(2) || "--:--"}</div>
    </div>
  );
};

export default StatusBar;
