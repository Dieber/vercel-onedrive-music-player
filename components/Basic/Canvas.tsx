import { forwardRef, HTMLAttributes, useEffect } from "react";

const Canvas: React.FunctionComponent<{
  canvasWidth: number,
  canvasHeight: number
}> = forwardRef<HTMLCanvasElement>((props, ref) => {


  let 

  useEffect(() => {

  }, [])


  return (
    <canvas
      {...props}
      style={
        {
          width: props.canvasWidth,
          width: props.canvasHeight,
          
        }
      }

      className="absolute top-0 left-0"
      id="visualization"
      ref={ref}
    ></canvas>
  );
});

Canvas.displayName = "Canvas";

export default Canvas;
