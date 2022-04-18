import { useEffect, useState } from "react";

type WindowInfo = {
  innerWidth: number | null;
  innerHeight: number | null;
};

const useWindowInfo = () => {
  let [info, setInfo] = useState<WindowInfo>({
    innerWidth: null,
    innerHeight: null,
  });
  useEffect(() => {
    setInfo({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
    // setMounted(true);
  }, []);
  return info;
};

export default useWindowInfo;
