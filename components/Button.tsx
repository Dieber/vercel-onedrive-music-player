interface Props {
  themeName: keyof typeof ThemeMap;
}

// tailwindcss optimization
const SpringButton: React.FC = ({ children }) => {
  return <button className="">{children}</button>;
};

const SummerButton: React.FC = ({ children }) => {
  return <button className="">{children}</button>;
};

const FallButton: React.FC = ({ children }) => {
  return <button className="">{children}</button>;
};

const WinterButton: React.FC = ({ children }) => {
  return <button className="">{children}</button>;
};

const ThemeMap = {
  spring: SpringButton,
  summer: SummerButton,
  fall: FallButton,
  winter: WinterButton,
};

const Button: React.FC<Props> = ({ themeName, children }) => {
  let FinalButton = ThemeMap[themeName];

  return <div>{<FinalButton>{children}</FinalButton>}</div>;
};

export default Button;
