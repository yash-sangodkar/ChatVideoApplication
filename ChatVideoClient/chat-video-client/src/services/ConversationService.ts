import { API_ENDPOINTS } from "../types/definedTypes";
import type { ConversationsForDisplay, CreateConversation } from "../types/global";
import { apiClient } from "./ApiClient";

export default {
  getConversationsByUserId: async (userId: string): Promise<ConversationsForDisplay[]> => {
    return await apiClient.get<ConversationsForDisplay[]>(
      `${API_ENDPOINTS.conversation}/getconversationbyuserid?userId=${userId}`
    );
  },
  createConversation: async (conversation: CreateConversation): Promise<ConversationsForDisplay> => {
    return await apiClient.post<ConversationsForDisplay>(
      `${API_ENDPOINTS.conversation}/createconversation`,
      conversation
    );
  },
};
