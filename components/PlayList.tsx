// import

import { Howl } from "howler";
import useMusicStore from "../store";
import Icon from "./Icon";

export type PlaylistItem = {
  src: string;
  id: string;
  name: string;
  // src: string;
};

export type PlayListData = Array<PlaylistItem>;

interface Props {
  playListData: PlayListData;
  // onClickItem: (item: PlaylistItem) => void;
}

const PlayList: React.FC<Props> = ({ playListData }) => {
  // const liveItemId = useMusicStore(state => state.liveItemId)
  // const playerState = useMusicStore(state => state.playerState)
  const { pause, loadThenPlay, play, playerState, liveItemId } =
    useMusicStore();

  return (
    <div className=" px-8 absolute top-0 w-[600px] right-0 bg-white h-full rounded-l-xl overflow-hdden shadow-md overflow-y-scroll">
      {playListData.length !== 0 &&
        playListData.map((item) => {
          return (
            <div
              className="h-20 flex items-center border-b-2 text-lg"
              key={item.id}
            >
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  if (item.id === liveItemId) {
                    switch (playerState) {
                      case "play": {
                        pause();
                        break;
                      }
                      case "pause": {
                        play();
                        break;
                      }
                      case "stop": {
                        loadThenPlay(item.id);
                      }
                    }
                  } else {
                    loadThenPlay(item.id);
                  }
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
