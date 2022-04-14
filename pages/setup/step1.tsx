import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { siteConfig, apiConfig } from "../../config/index.js";
import AppLayout from "../../components/AppLayout";
import Step from "../../components/Step";
import Link from "next/link";
import { camelToConstantCase, camelToSnakeCase } from "../../utils/case";
import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";
import StepLayout from "../../components/pages/StepLayout";

// import redis from 'redis'

// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type CheckIfRedisAvaliableResponse = {
  redis: boolean;
};

const ConfigTable = () => {
  return (
    <div className="border border-player-bg-lighten rounded-md px-4 py-2 my-4">
      {Object.entries(apiConfig).map(([key, value], index) => {
        return (
          <div
            className="flex w-full overflow-hidden h-[32px] leading-[32px]"
            key={key}
          >
            <div className="grow-0 shrink-0 basis-[250px] overflow-hidden text-left">
              {camelToConstantCase(key)}
            </div>
            <div className="flex-1 text-left">{value}</div>
            {/* {key}-{value} */}
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

export default function Step1() {
  let { data } = useSWR<CheckIfRedisAvaliableResponse>(
    "/api/checkIfRedisAvaliable"
  );

  const router = useRouter();
  const from = Number(router.query.from as string) || 1;

  // const { t } = useTranslation();

  return (
    <AppLayout>
      <StepLayout from={1} to={1}>
        <div>
          {true || data?.redis ? (
            <>
              <p className="my-2 text-left">
                {" "}
                Please check out deploy info below if it&apos;s correct, You can
                modify /config.js then deploy it again when you find something
                is wrong.
              </p>
              <ConfigTable></ConfigTable>

              <Link passHref href="/setup/step2?from=1">
                <button>Go Step2</button>
              </Link>
            </>
          ) : (
            <>
              <RedisInfo></RedisInfo>
            </>
          )}
        </div>
      </StepLayout>
    </AppLayout>
  );
}
