import useThemeStore from "../../store/useThemeStore";
import { ThemeMap } from "../Button";

const Background: React.FC = ({ children }) => {
  let theme = useThemeStore((state) => state.theme);

  return (
    <div className={`w-full h-full relative ${ThemeMap[theme]}`}>
      {children}
    </div>
  );
};

export default Background;
