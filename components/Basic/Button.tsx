import { CSSProperties, HTMLAttributes } from "react";
import { ThemeMap } from "../../constant";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  themeName?: keyof typeof ThemeMap;
}

export type ThemeType = Array<keyof typeof ThemeMap>;

const buttonStyle: CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
  marginTop: 16,
  marginBottom: 16,
};

const Button: React.FC<Props> = ({
  themeName = "spring",
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      title="theme"
      {...props}
      style={{
        ...props.style,
        ...buttonStyle,
      }}
      className={ThemeMap[themeName]}
    >
      {children}
    </button>
  );
};

export default Button;
