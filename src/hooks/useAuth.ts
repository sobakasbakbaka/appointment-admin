import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register } from "../api/auth/authApi.ts";
import Cookies from "js-cookie";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Сохраняем токен в cookies
      const token = { access_token: data.access_token };
      Cookies.set("authToken", JSON.stringify(token), { expires: 1 });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const token = { access_token: data.access_token };
      Cookies.set("authToken", JSON.stringify(token), { expires: 1 });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove("authToken");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    login: loginMutation,
    logout: logoutMutation,
    register: registerMutation,
  };
};
