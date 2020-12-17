import axios from "axios";
import { USERS_API } from "../config";

async function register(user) {
  const config = {
    method: "post",
    url: `${USERS_API + "/signup"}`,
    data: user,
  };
  let response = await axios(config);
  console.log(response);
  return response;
}

export default {
  register
};