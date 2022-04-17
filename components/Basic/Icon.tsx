import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {
  name: string;
  className?: string;
}

const Icon: React.FC<Props> = ({ className, name, ...props }) => {
  return (
    <svg
      {...props}
      className={`icon cursor-pointer ${className}`}
      aria-hidden="true"
    >
      <use xlinkHref={`#omp-${name}`}></use>
    </svg>
  );
};

export default Icon;
