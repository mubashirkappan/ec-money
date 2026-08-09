import api from "@/lib/axios";
import {
  LoginRequest,
  LoginResponse,
} from "@/features/auth/login/types/auth.types";

export async function login(
  payload: LoginRequest
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );

  return data;
}