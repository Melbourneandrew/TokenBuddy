import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export default async function addFriend(authToken, friendUsername) {
    return await axios({
    method: "post",
    url: `${url}/user/add-friend`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data:{
        friendUsername: friendUsername
    }
  });
}
