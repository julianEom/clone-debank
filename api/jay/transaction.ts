import axios from "axios"
const config = {
  headers: {'Access-Control-Allow-Origin': '*'}
};
export const getAllTransactions = async () => {
  const result = await axios.get('http://172.16.8.130:3000/all',config).then((res) => {return res.data});
  return result
}