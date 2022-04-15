import { useState } from "react";

interface Props {
  styleName: string;
}

const SpringButton: React.FC = ({ children }) => {
  return <button>{children}</button>;
};

const Button: React.FC<Props> = ({ styleName }) => {
  //

  // let [stat]

  return (
    <div>
      <div className="">123</div>
      <div className="">123</div>
      {/* <div className="">123</div>
      <div className="">123</div> */}
    </div>
  );
};

export default Button;
