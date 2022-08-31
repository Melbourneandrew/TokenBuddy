import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export default async function fetchFriends(authToken){
    return await axios({
        method: "get",
        url: `${url}/user/friends`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
}