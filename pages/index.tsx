import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { get, post } from "../libs/fetcher";
import styles from "../styles/Home.module.css";
import { Howl, Howler } from "howler";
// import mp3 from "../demo/shit.mp3";
import { map, T, F, over, lensProp, find, propEq, isNil } from "ramda";

import ControlPanel from "../components/ControlPanel";
import PlayList, { PlayListData, PlaylistItem } from "../components/PlayList";
import useMusicStore from "../store";

// function blobToArrayBuffer(blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.addEventListener("loadend", (e) => {
//       resolve(reader.result);
//     });
//     reader.addEventListener("error", reject);
//     reader.readAsArrayBuffer(blob);
//   });
// }

let mapList = (item: PlaylistItem) =>
  map((it: PlaylistItem) => {
    return over(lensProp("isPlaying"), it === item ? T : F, it);
  });

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
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full ">
        <ControlPanel
          musicTitle={""}
          onPause={() => {}}
          onPlay={() => {}}
        ></ControlPanel>
        {showList && (
          <PlayList
            playListData={playList ?? []}
            // onClickItem={clickItemHandler}
          ></PlayList>
        )}
      </main>
    </>
  );
}
