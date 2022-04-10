interface Props {
  name: string;
  className?: string;
}

const Icon: React.FC<Props> = (props) => {
  return (
    <svg
      className={`icon cursor-pointer ${props.className}`}
      aria-hidden="true"
    >
      <use xlinkHref={`#omp-${props.name}`}></use>
    </svg>
  );
};

export default Icon;
