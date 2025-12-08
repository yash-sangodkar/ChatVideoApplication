import { API_ENDPOINTS } from "../types/definedTypes";
import type { UserCredentials, UserLoggedInDetails } from "../types/global";
import { apiClient } from "./ApiClient";

export default {
  loginUser: async (userCreds: UserCredentials): Promise<UserLoggedInDetails> => {
    return await apiClient.post<UserLoggedInDetails>(`${API_ENDPOINTS.user}/login`, userCreds);
  },
  registerUser: async (userCreds: UserCredentials): Promise<boolean> => {
    return await apiClient.post<boolean>(`${API_ENDPOINTS.user}/register`, userCreds);
  },
  getUserById: async (userId: string): Promise<UserLoggedInDetails> => {
    return await apiClient.get<UserLoggedInDetails>(`${API_ENDPOINTS.user}/getuserbyid?userId=${userId}`);
  },
  getUsersForChatInitiation: async (userId: string): Promise<UserLoggedInDetails[]> => {
    return await apiClient.get<UserLoggedInDetails[]>(
      `${API_ENDPOINTS.user}/getusersforchatinitiation?userId=${userId}`
    );
  },
};
