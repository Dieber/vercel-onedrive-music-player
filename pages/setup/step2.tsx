import { useRouter } from "next/router";

import AppLayout from "../../components/AppLayout";

import StepLayout from "../../components/pages/StepLayout";
import { generateAuthorisationUrl } from "../../utils/token";
import { useState } from "react";
import { post } from "../../utils/fetcher";

export default function Step2() {
  const router = useRouter();

  return (
    <AppLayout>
      <StepLayout from={1} to={2}></StepLayout>
    </AppLayout>
  );
}
