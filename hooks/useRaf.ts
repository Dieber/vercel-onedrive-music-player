// import { useEffect } from "react";

// const useRaf = (fn: () => void, deps: Array<string>) => {
//   useEffect(() => {
//     let raf = () => {
//       fn();
//       requestAnimationFrame(raf);
//     };
//     let id = requestAnimationFrame(raf);
//     return () => {
//       cancelAnimationFrame(id);
//     };
//   }, [deps, fn]);
// };

// export default useRaf;

export {};
