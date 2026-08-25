import Cookies from "js-cookie";

export const authCookies = {
  getUserType() {
    return Cookies.get("userType");
  },

  setUserType(userType: "superadmin" | "user") {
    Cookies.set("userType", userType);
  },
};