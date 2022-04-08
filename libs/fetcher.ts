// import Url from "url-parse";
// import { message } from "antd";
// import { baseRequestUrl, ed, platformNo } from "../config";
// import useTokenStore from "../data/useTokenStore";
// import Router from "next/router";

import axios from "axios";

const get = axios.get;
const fetcher = get;
const post = axios.post;

export { get, fetcher, post };
