import Cookies from "js-cookie";

export const authCookies = {
  getUsername() {
    return Cookies.get("username");
  },

  getUserId() {
    return Cookies.get("userId");
  },
  
  getEmail() {
    return Cookies.get("email");
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

  setAuthCookies(username: string, email: string, userType: string, userId: string) {
    Cookies.set("userId", userId);
    Cookies.set("username", username);
    Cookies.set("email", email);
    Cookies.set("userType", userType);
    Cookies.set("accessToken", "accesstoken1123213");
    Cookies.set("refreshToken", "refreshtoken313513");
  },

  clear() {
    Cookies.remove("userId");
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("userType");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },
};