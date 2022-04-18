import { HTMLAttributes, useEffect, useState } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  from?: number;
  to?: number;
  totalStep?: number;
  size?: number;
}

const gap = 100;

const Step: React.FC<Props> = ({
  from = 1,
  to = 1,
  totalStep = 3,
  size = 40,
  ...restProps
}) => {
  const stepArr = new Array(totalStep).fill(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const activeIndex = (animated ? to : from) - 1;

  return (
    <div
      className={`flex justify-between ${restProps.className}`}
      style={{
        width: size * (totalStep * 2 - 1),
        ...restProps.style,
      }}
    >
      {stepArr.map((_item, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            className={`flex justify-center transition-colors duration-200 items-center rounded-full ${
              isActive ? "bg-white" : "bg-player-bg-lighten"
            } ${isActive ? "text-player-bg" : "text-white"}`}
            style={{
              width: size,
              height: size,
            }}
            key={index}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default Step;
