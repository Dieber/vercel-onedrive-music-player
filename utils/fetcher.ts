import axios from "axios";

// there are something may be intercepted..

const get = axios.get;
const fetcher = (...args: Parameters<typeof axios.get>) => {
  return get(...args).then((res) => res.data);
};
const post = axios.post;

export { get, fetcher, post };
