import { useEffect, useState } from "react";
import useMusicStore from "../../store/useMusicStore";
import useThemeStore from "../../store/useThemeStore";
import { ThemeMap } from "../Button";

import { isNil } from "ramda";

const Background: React.FC = ({ children }) => {
  let theme = useThemeStore((state) => state.theme);
  let { audio } = useMusicStore();
  let [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (!audio) {
      return;
    }
    let raf = () => {
      if (audio) {
        setProgress(audio.seek() / audio.duration());
        requestAnimationFrame(raf);
      }
    };

    let id = requestAnimationFrame(raf);

    return () => {
      if (!audio) {
        return;
      }
      cancelAnimationFrame(id);
    };
  }, [audio]);

  return (
    <>
      <div className={`w-full h-full relative ${ThemeMap[theme]}`}></div>
      {!isNil(progress) && (
        <div
          className="absolute top-0 left-0 "
          style={{
            background: "#000",
            opacity: ".1",
            height: "100%",
            width: `${progress! * 100}%`,
          }}
        ></div>
      )}

      <div className="absolute top-0 left-0 w-full h-full">{children}</div>
    </>
  );
};

export default Background;
