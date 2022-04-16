import { CSSProperties, HTMLAttributes } from "react";

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

// tailwindcss optimization

export const ThemeMap = {
  spring: "bg-gradient-to-bl from-green-400 to-blue-500",
  summer: "bg-gradient-to-bl from-red-700 via-orange-500 to-yellow-300",
  fall: "bg-gradient-to-tr from-yellow-100 via-red-200 to-rose-100",
  winter: "bg-gradient-to-bl from-indigo-700 via-violet-500 to-blue-300",
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
