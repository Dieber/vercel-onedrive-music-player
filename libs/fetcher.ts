// import Url from "url-parse";
// import { message } from "antd";
// import { baseRequestUrl, ed, platformNo } from "../config";
// import useTokenStore from "../data/useTokenStore";
// import Router from "next/router";

import axios from "axios";

const fetcher = <T = any>(url: string, fetchOptions = {}) =>
  new Promise<T>((resolve, reject) => {
    return axios.get(url, fetchOptions);
  });

// const swrFetcher = <T = any>(url: string, cookie: string) => {
//   console.log("GET-----" + url + "----------");
//   return fetcher<T>(url);
// };

// const post = <T = any>(url: string, body: any = {}, headers: any = {}) => {
//   console.log("POST-----" + url + "----------");
//   console.log({
//     ...body,
//   });
//   return fetcher<T>(url, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       ...headers,
//     },
//     body: JSON.stringify(body),
//   });
// };

// const get = (url: string, req: any) => {
//   return axios
//     .get(DEV_REQUEST_URL + url, {
//       validateStatus: function (status) {
//         return true; // default
//       },
//       headers: {
//         Cookie: req.headers.cookie ?? "",
//       },
//     })
//     .then((res) => {
//       return res.data;
//     })
//     .catch((e) => {
//       return Promise.reject(e);
//     });
// };

export { fetcher };
