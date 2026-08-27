import Cookies from "js-cookie";

export const authCookies = {
  getUsername() {
    return Cookies.get("username");
  },

  getUserType() {
    return Cookies.get("userType");
  },

  getAccessToken() {
    return Cookies.get("accessToken");
  },

  getRefreshToken() {
    return Cookies.get("refreshToken");
  },

  setAuthCookies(username: string, userType: string) {
    Cookies.set("username", username);
    Cookies.set("userType", userType);
    Cookies.set("accessToken", "accesstoken1123213");
    Cookies.set("refreshToken", "refreshtoken313513");
  },

  clear() {
    Cookies.remove("username");
    Cookies.remove("userType");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },
};