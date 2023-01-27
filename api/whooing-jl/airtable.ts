import axios from "axios"
import { AirtableTxRecord } from "../../interface/Airtable.type";

const token = process.env.AIRTABLE_TOKEN;
const base = process.env.AIRTABLE_BASE_ID;
const table = process.env.AIRTABLE_TABLE_ID;
const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 50000,
});
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const prefix = `https://api.airtable.com/v0/${base}/${table}`;
export const getWhoAmI = async () => {
  const result = await instance.get(`${prefix}`).then((res) => {return res});
  console.log('result',result);
  return result
}
export const getTxList = async () => {
  // https://api.airtable.com/v0/{base id}/{table id}
  const result = await instance.get(`${prefix}`).then((res) => {return res});
  console.log('result',result);
  return result
}
export const insertTx = async (data:any) => {
  const result = await instance.post(`${prefix}`,data).then((res) => {return res});
  console.log('result',result);
  return result
}
export const updateTx = async (data:AirtableTxRecord) => {
  const result = await instance.post(`${prefix}/${data.id}`,data).then((res) => {return res});
  console.log('result',result);
  return result
}