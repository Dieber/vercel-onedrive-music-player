import { useEffect, useState } from "react";
import useMusicStore from "../../store/useMusicStore";

const StatusBar: React.FC = () => {
  let { audioData } = useMusicStore();

  let [currentTime, setCurrentTime] = useState<number | null>(null);
  let [totalTime, setTotalTime] = useState<number | null>(null);

  // when audio is loaded
  useEffect(() => {
    if (!audioData) {
      return;
    }

    let audio = audioData.audio;

    setTotalTime(audioData.audio.duration());

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
  }, [audioData]);

  return (
    <div className="status-bar p-24 flex w-full justify-between text-3xl text-cyan-50 font-bold">
      <div className="w-[200px]">{currentTime?.toFixed(2) || "--:--"}</div>
      <div className="text-2xl my-2">
        {" "}
        {audioData?.title || audioData?.fileName || ""}
      </div>
      <div className="w-[200px] text-right">
        {totalTime?.toFixed(2) || "--:--"}
      </div>
    </div>
  );
};

export default StatusBar;
