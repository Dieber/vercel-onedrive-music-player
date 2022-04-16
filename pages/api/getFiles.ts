import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "../../utils/oauth";
import { posix as pathPosix } from "path";
import { apiConfig, siteConfig } from "../../config";
import axios from "axios";

import { filter, lensPath, over, isNil, o, prop } from "ramda";

const basePath = pathPosix.resolve("/", siteConfig.baseDirectory);

const itemFilterFolder = filter(o(isNil, prop("folder")));

/**
 * Encode the path of the file relative to the base directory
 *
 * @param path Relative path of the file to the base directory
 * @returns Absolute path of the file inside OneDrive
 */
export function encodePath(path: string): string {
  let encodedPath = pathPosix.join(basePath, path);
  if (encodedPath === "/" || encodedPath === "") {
    return "";
  }
  encodedPath = encodedPath.replace(/\/$/, "");
  return `:${encodeURIComponent(encodedPath)}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path = "/", raw = false, next = "" } = req.query;

  if (path === "[...path]") {
    res.status(400).json({ error: "No path specified." });
    return;
  }
  // If the path is not a valid path, return 400
  if (typeof path !== "string") {
    res.status(400).json({ error: "Path query invalid." });
    return;
  }

  const cleanPath = pathPosix.resolve("/", pathPosix.normalize(path));

  const accessToken = await getAccessToken();

  if (!accessToken) {
    res.status(403).json({ error: "No access token." });
    return;
  }

  const requestPath = encodePath(cleanPath);

  const isRoot = requestPath === "";

  // Handle response from OneDrive API

  const requestUrl = `${apiConfig.driveApi}/root${requestPath}${
    isRoot ? "" : ":"
  }/children`;
  // Whether path is root, which requires some special treatment

  try {
    let { data: identityData } = await axios.get(requestUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        select:
          "name,size,id,lastModifiedDateTime,folder,file,video,image,@microsoft.graph.downloadUrl",
      },
    });

    identityData = itemFilterFolder(identityData.value);

    // TODO add scan folder support

    res.status(200).json({ files: identityData });
    return;
  } catch (error: any) {
    console.log(error);
    res
      .status(error?.response?.code ?? 500)
      .json({ error: error?.response?.data ?? "Internal server error." });
    return;
  }
}
