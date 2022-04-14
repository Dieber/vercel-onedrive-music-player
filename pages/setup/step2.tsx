import { useRouter } from "next/router";

import AppLayout from "../../components/AppLayout";

import StepLayout from "../../components/pages/StepLayout";
import { generateAuthorisationUrl } from "../../utils/token";
import { useState } from "react";
import { post } from "../../utils/fetcher";

const authUrl = generateAuthorisationUrl();

export default function Step2() {
  const router = useRouter();

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

                post(`/api/storeTokenByOAuth`, {
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
