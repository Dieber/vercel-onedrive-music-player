import { forwardRef, useEffect } from "react";

interface CanvasProps extends React.HTMLProps<HTMLCanvasElement> {
  canvasWidth: number;
  canvasHeight: number;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ canvasWidth, canvasHeight, ...props }, ref) => {
    return (
      <canvas
        {...props}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          ...props.style,
        }}
        width={canvasWidth}
        height={canvasHeight}
        id="visualization"
        ref={ref}
      ></canvas>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
