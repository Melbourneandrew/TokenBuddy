import getStoredUserInfo from "../get/getStoredUserInfo";
import storeUserInfo from "./storeUserInfo";

export default async function storePfp(link) {
  const userInfo = await getStoredUserInfo();
  userInfo.pfp = link;
  await storeUserInfo(userInfo);
}