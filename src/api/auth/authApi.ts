import { AuthResponse, LoginDto, RegisterDto } from "./auth.contract.ts";
import { kyInstance } from "../kyInstance.ts";
import Cookies from "js-cookie";

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  try {
    const response = await kyInstance.post("auth/login", {
      json: data,
    });

    return (await response.json()) as AuthResponse;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  try {
    const response = await kyInstance.post("auth/register", {
      json: data,
    });

    return (await response.json()) as AuthResponse;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    Cookies.remove("authToken");

    await kyInstance.post("auth/logout");
  } catch (error) {
    console.error("Error logging out", error);
    throw error;
  }
};
