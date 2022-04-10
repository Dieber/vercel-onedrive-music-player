// import

import { Howl } from "howler";
import Icon from "./Icon";

type PlaylistItem = {
  howl: Howl;
  isPlaying: boolean;
  id: string;
  name: string;
  // src: string;
};

export type PlayListData = Array<PlaylistItem>;

interface Props {
  playListData: PlayListData;
  onClickItem: (item: PlaylistItem) => void;
}

const PlayList: React.FC<Props> = ({ playListData, onClickItem }) => {
  return (
    <div className="absolute top-0">
      {playListData.length !== 0 &&
        playListData.map((item) => {
          return (
            <div key={item.id}>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  onClickItem(item);
                }}
              >
                {item.name}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PlayList;
