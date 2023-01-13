import { MoralisNextApi } from "@moralisweb3/next";
const key = process.env.MORALIS_API_KEY ? process.env.MORALIS_API_KEY : '';
export default MoralisNextApi({ apiKey: key });