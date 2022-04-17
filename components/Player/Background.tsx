import { useEffect, useRef, useState } from "react";
import useMusicStore from "../../store/useMusicStore";
import useThemeStore from "../../store/useThemeStore";

import { isNil } from "ramda";
import { ThemeMap } from "../../constant";
import useMounted from "../../hooks/useMounted";

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
    barHeight = dataArray[i] / 2;

    ctx.fillStyle = "rgb(" + (barHeight + HEIGHT) + ",50,50)";
    ctx.fillRect(x, 400 - barHeight / 2, barWidth, barHeight);

    x += barWidth + 1;
  }
};

const Background: React.FC = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);
  const { audioData } = useMusicStore();
  const [progress, setProgress] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null!);


  const mounted = useMounted()

  

  useEffect(() => {
    if (!audioData) {
      return;
    }



    let { audio } = audioData;

    let ctx = canvasRef.current.getContext("2d")!;

    let analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(analyser);
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    let raf = () => {
      if (audio) {
        // progress bar
        setProgress(audio.seek() / audio.duration());
        // canvas ctx

        if (ctx) {
          drawFFTinCanvas(ctx, analyser, canvasRef.current.width, canvasRef.current.height);
        }

        // analyser = Howler.ctx.createAnalyser()

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
  }, [audioData]);

  return (
    <>
      <div className={`w-full h-full relative ${ThemeMap[theme]}`}></div>
      {!isNil(progress) && (
        <div
          className="absolute top-0 left-0 "
          style={{
            background: "#fff",
            opacity: ".1",
            height: "100%",
            width: `${progress! * 100}%`,
          }}
        ></div>
      )}
      <canvas
        className="absolute top-0 left-0 w-full h-full"
        id="visualization"
        ref={canvasRef}
      ></canvas>

      <div className="absolute top-0 left-0" style={{
        width: 
      }}>{children}</div>
    </>
  );
};

export default Background;
