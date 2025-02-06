import fetchJson from "./fetchJson";
import getRepoFileUrl from "./getRepoFileUrl";

export default async (path: string) => {
  const url = getRepoFileUrl(path);
  return await fetchJson(url);
};
