import Image, { ImageProps } from "next/image";

// type Image =

interface Props extends ImageProps {}

const Cover: React.FC<Props> = ({ ...props }) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      onLoad={() => {
        // clean Effect when loaded
        URL.revokeObjectURL(props.src as string);
      }}
      width={300}
      height={300}
    ></Image>
  );
};

export default Cover;
