import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { siteConfig, apiConfig } from "../../config/index.js";
import AppLayout from "../../components/AppLayout";
import Step from "../../components/Step";
import Link from "next/link";
import StepLayout from "../../components/pages/StepLayout";
import { generateAuthorisationUrl } from "../../utils/oauth";
import { useState } from "react";
import { fetcher, post } from "../../libs/fetcher";
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const authUrl = generateAuthorisationUrl();

export default function Step2() {
  const router = useRouter();
  const from = Number(router.query.from as string) || 2;

  const [oAuthCode, setOAuthCode] = useState("");

  // const { t } = useTranslation();

  return (
    <AppLayout>
      <StepLayout from={1} to={2}>
        <div>
          <div className="w-full">
            <button
              onClick={() => {
                window.open(authUrl);
              }}
            >
              OAuth OneDrive Account!
            </button>
          </div>
          <div>
            <input
              className="text-black"
              value={oAuthCode}
              onChange={(e) => {
                setOAuthCode(e.target.value);
              }}
            ></input>
            <button
              disabled={!oAuthCode}
              onClick={() => {
                if (!oAuthCode) {
                  return;
                }

                post(`/api/storeTokenByOauth`, {
                  code: oAuthCode,
                })
                  .then((e) => {
                    console.log(e);
                  })
                  .catch((e) => {
                    console.log("catch", e);
                  });
              }}
            >
              Store OAuth!
            </button>
          </div>
        </div>
      </StepLayout>
    </AppLayout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      // ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
