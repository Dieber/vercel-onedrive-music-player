// import

import Icon from "./Icon";

interface Props {
  currentTime?: number;
  totalTime?: number;
  musicTitle?: string;
}

const Player: React.FC<Props> = ({ currentTime, totalTime, musicTitle }) => {
  return (
    <div className="w-full h-full relative bg-gradient-to-bl from-green-400 to-blue-500 p-16">
      <div className="status-bar flex w-full justify-between text-5xl text-cyan-50 font-bold">
        <div>{currentTime || "--:--"}</div>
        <div>{musicTitle}</div>
        <div>{totalTime || "--:--"}</div>
      </div>
      <div className="main"></div>
      <div className="control-bar flex absolute left-0 right-0 bottom-16 w-1/2 my-0 mx-auto justify-between text-cyan-50 text-5xl">
        {/* <div></div> */}
        <Icon name="audio-high"></Icon>

        <Icon name="previous"></Icon>
        <Icon name="play"></Icon>
        <Icon name="next"></Icon>
        <Icon name="list"></Icon>

        {/* <div></div> */}
        {/* <div></div> */}
      </div>
    </div>
  );
};

export default Player;
