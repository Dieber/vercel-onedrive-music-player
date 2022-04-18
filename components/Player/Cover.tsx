import Image, { ImageProps } from "next/image";

// type Image =

interface Props extends ImageProps {}

const Cover: React.FC<Props> = ({ ...props }) => {
  return (
    <div
      className={`overflow-hidden border-black sm:border-[50px] border-[35px] ${props.className}`}
      style={{
        animation: "coverSpin 20s linear infinite",
      }}
    >
      <Image
        src={props.src}
        alt={props.alt}
        onLoad={() => {
          URL.revokeObjectURL(props.src as string);
        }}
        width={props.width}
        height={props.height}
      ></Image>
    </div>
  );
};

export default Cover;
