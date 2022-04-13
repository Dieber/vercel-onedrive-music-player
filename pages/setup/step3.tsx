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
import { generateAuthorisationUrl } from "../../utils/token";
import { useState } from "react";
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const authUrl = generateAuthorisationUrl();

export default function Step3() {
  const router = useRouter();
  const from = Number(router.query.from as string) || 2;

  const [oAuthCode, setOAuthCode] = useState("");

  // const { t } = useTranslation();

  return (
    <AppLayout>
      <StepLayout from={2} to={3}></StepLayout>
    </AppLayout>
  );
}
