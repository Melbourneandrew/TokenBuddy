import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export default async function uploadPfp(formData, authToken) {
  return await axios({
    method: "post",
    url: `${url}/user/pfp`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${authToken}`,
    },
  });
}
