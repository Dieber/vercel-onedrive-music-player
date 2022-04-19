import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { siteConfig, apiConfig } from "../../config/index.js";
import AppLayout from "../../components/AppLayout";
import Step from "../../components/Step";
import Link from "next/link";
import { camelToConstantCase, camelToSnakeCase } from "../../utils/caster";
import { fetcher, post } from "../../utils/fetcher";
import useSWR from "swr";
// import StepLayout from "../../components/pages/StepLayout";
import { generateAuthorisationUrl, getAuthPersonInfo } from "../../utils/token";
import { useState } from "react";
import Button, { ThemeType } from "../../components/Basic/Button";
import useThemeStore, { Theme } from "../../store/useThemeStore";
import axios from "axios";

const authUrl = generateAuthorisationUrl();

type CheckIfRedisAvaliableResponse = {
  redis: boolean;
};

const ConfigTable = () => {
  return (
    <div className="border border-player-bg-lighten rounded-md px-4 py-2 my-4">
      {Object.entries(apiConfig).map(([key, value]) => {
        return (
          <div
            className="flex w-full overflow-hidden h-[32px] leading-[32px]"
            key={key}
          >
            <div className="grow-0 shrink-0 basis-[250px] overflow-hidden text-left">
              {camelToConstantCase(key)}
            </div>
            <div className="flex-1 text-left ">
              <div>{value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RedisInfo = () => {
  return (
    <div className="text-left border-1 rounded-md bg-red-900/30 p-4 m-4">
      <p>
        It Seems that you haven&apos;`t specified REDIS_URL in Vercel env
        variable.{" "}
      </p>
      <p>
        You need to deploy the project again and specific REDIS_URL or integrate
        one with Upstash
      </p>
    </div>
  );
};

const getCodefromOAuthUrl = (oAuthCodeUrl: string) => {
  let params;
  let oAuthCode;
  try {
    params = new URL(oAuthCodeUrl).searchParams;
    oAuthCode = Object.fromEntries(params.entries()).code;
  } catch (e) {
    oAuthCode = null;
  }

  return oAuthCode;
};

export default function Setup() {
  const { data } = useSWR<CheckIfRedisAvaliableResponse>(
    "/api/checkIfRedisAvaliable"
  );

  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [oAuthCodeUrl, setOAuthCodeUrl] = useState("");
  const [allReady, setAllReady] = useState(false);

  const oAuthCode = getCodefromOAuthUrl(oAuthCodeUrl);

  const handleStoreOAuthToken = async () => {
    if (!oAuthCode) {
      return;
    }

    const { data, status } = await getAuthPersonInfo(oAuthCode);
    console.log("shit");

    if (status !== 200) {
      return;
    }
    if (data.userPrincipalName !== apiConfig.userName) {
      console.log("fuck");
      return;
    }

    console.log(oAuthCode);

    axios
      .post(`/api/storeTokenByOAuth`, {
        code: oAuthCode,
      })
      .then((e) => {
        setAllReady(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeTheme = (theme: Theme) => {
    setTheme(theme);
  };

  const handleStart = () => {
    router.push("/");
  };

  return (
    <AppLayout>
      <main className="text-white flex justify-center align-middle">
        <div className="bg-player-bg  w-full md:w-2/3 xl:w-1/2 p-8 m-8 rounded-md black ">
          <h1 className="text-3xl text-center"> Welcome to your cloud music</h1>
          <div className="my-5 mx-auto w-full flex justify-center">
            <Image
              src="/VOMP.png"
              alt="appIcon"
              width={256}
              height={256}
            ></Image>
          </div>

          <p className="my-2 text">
            {" "}
            Here are few steps to set before you enjoy...
          </p>
          {/* <Step className={"my-0 mx-auto"} from={from} to={to}></Step> */}
          <div>
            {true || data?.redis ? (
              <>
                <p className="my-2 text-left">
                  {" "}
                  Please check out deploy info below if it&apos;s correct, You
                  can modify /config.js then deploy it again when you find
                  something is wrong.
                </p>
                <ConfigTable></ConfigTable>
                {/* Setup */}

                <p>
                  <b>Setup</b>: login your Microsoft account and copy the
                  callback url
                </p>

                <div className="w-full">
                  <Button
                    themeName={theme}
                    onClick={() => {
                      window.open(authUrl);
                    }}
                  >
                    OAuth OneDrive Account!
                  </Button>
                </div>
                {/* Step2 */}
                <p>
                  <b>Step2</b>: paste your authorisation code to the link and
                  click the button
                </p>

                <div className="w-full flex my-2 items-center">
                  <input
                    className="flex-1 mr-2 px-4 py-2 rounded-lg text-black"
                    value={oAuthCodeUrl}
                    placeholder="http://localhost/?code=M.R3_BAY.c0..."
                    onChange={(e) => {
                      setOAuthCodeUrl(e.target.value);
                    }}
                  ></input>
                  <Button
                    style={{
                      cursor: oAuthCodeUrl ? "pointer" : "not-allowed",
                    }}
                    // disabled={!oAuthCodeUrl}
                    themeName={theme}
                    onClick={handleStoreOAuthToken}
                  >
                    Store token!
                  </Button>
                </div>
                {/* Step3 */}
                <div>
                  <p>
                    <b>Step3</b>: Select one of your favourate theme color!
                  </p>
                  <div className="flex w-full justify-between">
                    <span className="">
                      {(
                        ["spring", "summer", "fall", "winter"] as ThemeType
                      ).map((item) => {
                        return (
                          <span className={""} key={item}>
                            <Button
                              onClick={() => {
                                handleChangeTheme(item);
                              }}
                              themeName={item}
                              title={item}
                              style={{
                                marginRight: 16,
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                            ></Button>
                          </span>
                        );
                      })}
                    </span>
                    <Button
                      themeName={theme}
                      style={{
                        cursor: allReady ? "pointer" : "not-allowed",
                      }}
                      onClick={handleStart}
                    >
                      Start →
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <RedisInfo></RedisInfo>
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
