// import Url from "url-parse";
// import { message } from "antd";
// import { baseRequestUrl, ed, platformNo } from "../config";
// import useTokenStore from "../data/useTokenStore";
// import Router from "next/router";

import axios from "axios";

const get = axios.get;
const fetcher = (...args: Parameters<typeof axios.get>) => {
  return get(...args).then((res) => res.data);
};
const post = axios.post;

export { get, fetcher, post };
