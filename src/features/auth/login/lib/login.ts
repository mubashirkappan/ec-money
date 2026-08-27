import { loginData } from "@/dummy_db/login.mock";
import { authCookies } from "@/lib/cookies"

type LoginDataProps = {
  username: string;
  password: string;
  rememberMe: boolean;
};


export function Login(loginDataProps: LoginDataProps) {
  const user = loginData.find(
    (loginUser) =>
      loginUser.userId.contact === loginDataProps.username &&
      loginUser.password === loginDataProps.password
  );

  if (user) {
    authCookies.setAuthCookies(user.userId.contact, user.userId.userType);
    console.log("Login successful");
    return true
  } else {
    console.log("Invalid username or password");
    return false
  }
}