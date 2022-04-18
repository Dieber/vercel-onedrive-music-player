import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";

// import ControlPanel from "../components/ControlPanel";
import PlayList from "../components/PlayList";
import Player from "../components/Player";
import useMusicStore from "../store/useMusicStore";

export default function Home() {
  const { data: filesList } = useSWR("/api/getFiles");
  const { playList, showList } = useMusicStore();
  const { setPlayList } = useMusicStore();

  useEffect(() => {
    if (!filesList) {
      return;
    }

    setPlayList(
      filesList.files.map((item: any) => ({
        id: item.id,
        name: item.name,
        src: item["@microsoft.graph.downloadUrl"],
      }))
    );
  }, [filesList, setPlayList]);

  return (
    <>
      <main className="w-full h-full ">
        <Player musicTitle={""} onPause={() => {}} onPlay={() => {}}></Player>
        {showList && <PlayList playListData={playList ?? []}></PlayList>}
      </main>
    </>
  );
}
