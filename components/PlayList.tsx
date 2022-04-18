// import

import { Howl } from "howler";
import Icon from "./Basic/Icon";
import Image from "next/image";
import useMusicStore, {
  PlaylistItem,
  PlayListData,
} from "../store/useMusicStore";

interface Props {
  playListData: PlayListData;
}

const PlayList: React.FC<Props> = ({ playListData }) => {
  const { pause, load, play, playerState, liveItem, setShowList } =
    useMusicStore();

  return (
    <div className="absolute top-0 w-full sm:w-[600px] right-0 bg-white h-full rounded-none sm:rounded-l-xl overflow-hdden shadow-md overflow-y-scroll">
      <div className="w-full h-[200px] fixed">
        <Image src={"/playlist.jpg"} alt="playlist-cover" layout="fill"></Image>
        <Icon
          onClick={() => {
            setShowList(false);
          }}
          name="delete"
          className="absolute top-4 left-4 text-white text-3xl"
        ></Icon>
      </div>
      <div className="pt-[200px]">
        {playListData.length !== 0 &&
          playListData.map((item) => {
            return (
              <div
                className="px-8 h-20 flex items-center border-b-2 text-lg"
                key={item.id}
                style={{
                  background: item === liveItem ? "#efefef" : "white",
                }}
              >
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    if (item === liveItem) {
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
                          load(item);
                        }
                      }
                    } else {
                      load(item);
                    }
                  }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayList;
