import { useEffect, useRef, useState } from "react";
import useMusicStore from "../../store/useMusicStore";
import useThemeStore from "../../store/useThemeStore";

import { isNil } from "ramda";
import { ThemeMap } from "../../constant";
import useMounted from "../../hooks/useMounted";
import Canvas from "../Basic/Canvas";
import useWindowInfo from "../../hooks/useWindowInfo";

const drawFFTinCanvas = (
  ctx: CanvasRenderingContext2D,
  analyser: AnalyserNode,
  WIDTH: number,
  HEIGHT: number
) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;

  var dataArray = new Uint8Array(bufferLength);

  analyser.getByteFrequencyData(dataArray);
  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 255) * HEIGHT * 2;
    ctx.fillStyle = "rgb(255,255,255,.3)";
    ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);
    x += barWidth + 1;
  }
};

const Background: React.FC = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);
  const { audioData } = useMusicStore();
  const [progress, setProgress] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const { innerWidth, innerHeight } = useWindowInfo();

  useEffect(() => {
    if (!audioData) {
      return;
    }

    const { audio } = audioData;

    const ctx = canvasRef.current.getContext("2d")!;

    const analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(analyser);

    const raf = () => {
      if (audio) {
        // progress bar
        setProgress(audio.seek() / audio.duration());

        if (ctx) {
          drawFFTinCanvas(
            ctx,
            analyser,
            canvasRef.current.width,
            canvasRef.current.height
          );
        }

        // analyser = Howler.ctx.createAnalyser()

        requestAnimationFrame(raf);
      }
    };

    const id = requestAnimationFrame(raf);

    return () => {
      if (!audio) {
        return;
      }
      cancelAnimationFrame(id);
    };
  }, [audioData]);

  return (
    <div className="w-full h-full relative">
      <div className={`w-full h-full ${ThemeMap["spring"]}`}></div>
      {!isNil(progress) && (
        <div
          className="absolute top-0 left-0"
          style={{
            background: "#fff",
            opacity: ".1",
            height: "100%",
            width: `${progress! * 100}%`,
          }}
        ></div>
      )}
      {innerWidth ? (
        <Canvas
          // className="w-full h-full"
          id="visualization"
          className="absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%,-50%)",
          }}
          ref={canvasRef}
          canvasWidth={innerWidth > 640 ? 600 : 300}
          canvasHeight={innerWidth > 640 ? 600 : 300}
        ></Canvas>
      ) : (
        " "
      )}

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={
          {
            // width:
          }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Background;
