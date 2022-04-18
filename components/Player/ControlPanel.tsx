import useMusicStore from "../../store/useMusicStore";
import Icon from "../Basic/Icon";

const mapIcons = {
  play: "pause",
  stop: "play",
  pause: "play",
  loading: "cloud-download",
};

const ControlPanel: React.FC = () => {
  const { playerState, audioData, pause, play, next, prev, setShowList } =
    useMusicStore();

  return (
    <div className="control-bar flex absolute left-0 right-0 bottom-16 w-full sm:w-1/2 px-8 sm:px-0 my-0 mx-auto justify-between text-cyan-50 text-5xl">
      <Icon name="audio-high" className="text-3xl sm:text-5xl"></Icon>
      <Icon
        name="previous"
        className="text-3xl sm:text-5xl"
        onClick={() => {
          prev();
        }}
      ></Icon>
      <Icon
        className="text-3xl sm:text-5xl"
        name={mapIcons[playerState]}
        onClick={() => {
          if (!audioData) {
            return;
          }
          switch (playerState) {
            case "loading": {
              break;
            }
            case "play": {
              pause();
              break;
            }
            default: {
              play();
              break;
            }
          }
        }}
      ></Icon>
      <Icon
        name="next"
        className="text-3xl sm:text-5xl"
        onClick={() => {
          next();
        }}
      ></Icon>
      <Icon
        name="list"
        className="text-3xl sm:text-5xl"
        onClick={() => {
          setShowList(true);
        }}
      ></Icon>
    </div>
  );
};

export default ControlPanel;
