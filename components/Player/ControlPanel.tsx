import useMusicStore from "../../store/useMusicStore";
import Icon from "../Icon";

const mapIcons = {
  play: "pause",
  stop: "play",
  pause: "play",
  loading: "cloud-download",
};

const ControlPanel: React.FC = () => {
  let { playerState, audio, pause, play, next, prev, setShowList } =
    useMusicStore();

  return (
    <div className="control-bar flex absolute left-0 right-0 bottom-16 w-1/2 my-0 mx-auto justify-between text-cyan-50 text-5xl">
      <Icon name="audio-high"></Icon>
      <Icon
        name="previous"
        onClick={() => {
          prev();
        }}
      ></Icon>
      <Icon
        name={mapIcons[playerState]}
        onClick={() => {
          if (!audio) {
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
        onClick={() => {
          next();
        }}
      ></Icon>
      <Icon
        name="list"
        onClick={() => {
          setShowList(true);
        }}
      ></Icon>
    </div>
  );
};

export default ControlPanel;
