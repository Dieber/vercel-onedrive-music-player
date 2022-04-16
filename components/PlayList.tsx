// import

import { Howl } from "howler";
import Icon from "./Icon";
import Image from "next/image";
import useMusicStore from "../store/useMusicStore";

export type PlaylistItem = {
  src: string;
  id: string;
  name: string;
  // src: string;
};

export type PlayListData = Array<PlaylistItem>;

interface Props {
  playListData: PlayListData;
}

const PlayList: React.FC<Props> = ({ playListData }) => {
  const { pause, load, play, playerState, liveItem, setShowList } =
    useMusicStore();

  return (
    <div className=" absolute top-0 w-[600px] right-0 bg-white h-full rounded-l-xl overflow-hdden shadow-md overflow-y-scroll">
      <div className="w-full h-[200px] relative">
        <Image
          className="absolute"
          src={"/playlist.jpg"}
          alt="playlist-cover"
          width={600}
          height={200}
        ></Image>
        <Icon
          onClick={() => {
            setShowList(false);
          }}
          name="delete"
          className="absolute top-4 left-4 text-white text-3xl"
        ></Icon>
      </div>

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
  );
};

export default PlayList;
