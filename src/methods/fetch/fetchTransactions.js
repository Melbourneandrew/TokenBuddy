import axios from "axios";
import getStoredLoginToken from "../get/getStoredLoginToken";
const url = import.meta.env.VITE_API_URL;

export default async function fetchTransactions(){
    const authToken = await getStoredLoginToken();
    return await axios({
        method: "get",
        url: `${url}/user/transactions`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
}