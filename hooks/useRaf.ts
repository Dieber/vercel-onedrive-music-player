// import { useEffect } from "react";

// const useRaf = (fn: () => void, deps: Array<string>) => {
//   useEffect(() => {
//     const raf = () => {
//       fn();
//       requestAnimationFrame(raf);
//     };
//     const id = requestAnimationFrame(raf);
//     return () => {
//       cancelAnimationFrame(id);
//     };
//   }, [deps, fn]);
// };

// export default useRaf;

export {};
