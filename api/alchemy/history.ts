import { Alchemy, Network,AssetTransfersCategory,SortingOrder } from "alchemy-sdk";

const ALCHEMYKEY = process.env.alchemyKey ? process.env.alchemyKey : '';
  const settings = {
    apiKey: ALCHEMYKEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const alchemy = new Alchemy(settings);
  
  export const getTransactionReceipt = async (blockHash: string) => {
    const result = await alchemy.core.getTransactionReceipt(blockHash).then((res) => {return res});
    return result;
  }
  export const getTokenMetadata = async (usdcContract: string) => {
    const result = await alchemy.core.getTokenMetadata(usdcContract).then((res) => {return res});
    return result;
  }