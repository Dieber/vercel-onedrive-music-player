import { useEffect, useState } from "react";

const useMounted = () => {
  let [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export default useMounted;
