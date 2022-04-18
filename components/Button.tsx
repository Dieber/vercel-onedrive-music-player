import { CSSProperties, HTMLAttributes } from "react";

interface ThemeButtonProps extends HTMLAttributes<HTMLButtonElement> {}

interface ButtonProps extends ThemeButtonProps {
  themeName?: "spring" | "summer" | "fall" | "winter";
}

const buttonStyle: CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
};

const SpringButton: React.FC<ThemeButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="bg-gradient-to-bl from-green-400 to-blue-500">
      {children}
    </button>
  );
};

const SummerButton: React.FC<ThemeButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-gradient-to-bl from-red-700 via-orange-500 to-yellow-300"
    >
      {children}
    </button>
  );
};

const FallButton: React.FC<ThemeButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-gradient-to-tr from-yellow-100 via-red-200 to-rose-100"
    >
      {children}
    </button>
  );
};

const WinterButton: React.FC<ThemeButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-gradient-to-bl from-indigo-700 via-violet-500 to-blue-300"
    >
      {children}
    </button>
  );
};

const ButtonMap = {
  spring: SpringButton,
  summer: SummerButton,
  fall: FallButton,
  winter: WinterButton,
};

// tailwindcss optimization
const Button: React.FC<ButtonProps> = ({
  themeName = "spring",
  children,
  ...props
}) => {
  const ThemeButton = ButtonMap[themeName];

  return <ThemeButton {...props} style={buttonStyle}></ThemeButton>;
};

export default Button;
