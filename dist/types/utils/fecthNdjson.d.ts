/// <reference types="bun-types" />
/// <reference types="node" />
/// <reference types="node" />
import { MessageArray, ResponseData } from "./types";
declare function fetchNdjson(url: string | URL | Request, data: any, getToken: (tokenData: ResponseData) => void): Promise<string | MessageArray>;
export default fetchNdjson;
