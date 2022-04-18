import { useEffect, useState } from "react";
import useMusicStore from "../../store/useMusicStore";
import { isNil } from "ramda";

const convertToClock = (second: number | null) => {
  if (isNil(second)) return "--:--";

  const minute = ~~(second! / 60);
  const sec = ~~second! % 60;

  return `${minute < 10 ? "0" : ""}${~~(second! / 60)}:${sec < 10 ? "0" : ""}${
    ~~second! % 60
  }`;
};

const StatusBar: React.FC = () => {
  const { audioData } = useMusicStore();

  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number | null>(null);

  // when audio is loaded
  useEffect(() => {
    if (!audioData) {
      return;
    }

    const audio = audioData.audio;

    setTotalTime(audioData.audio.duration());

    const raf = () => {
      if (audio) {
        setCurrentTime(audio.seek());
        requestAnimationFrame(raf);
      }
    };

    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
    };
  }, [audioData]);

  return (
    <div>
      <div className="status-bar p-4 sm:p-16 flex w-full justify-between items-center text-xl sm:text-3xl text-cyan-50 font-bold">
        <div className="w-1/4">{convertToClock(currentTime)}</div>
        <div className="w-1/2 text-lg text-center sm:text-3xl my-2">
          {audioData?.title || audioData?.fileName || ""}
        </div>
        <div className="w-1/4 text-right">{convertToClock(totalTime)}</div>
      </div>
    </div>
  );
};

export default StatusBar;
