import axios from "axios";
import Cookie from "universal-cookie";

const cookie = new Cookie();
let token = cookie.get("access_token");

const BASE_URL = "http://127.0.0.1:8000";

export default axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});
