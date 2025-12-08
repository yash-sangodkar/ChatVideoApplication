import { API_ENDPOINTS } from "../types/definedTypes";
import type { Message } from "../types/global";
import { apiClient } from "./ApiClient";

export default {
  getMessagesByConversationId: async (conversationId: string): Promise<Message[]> => {
    return await apiClient.get<Message[]>(
      `${API_ENDPOINTS.messages}/getmessages?conversationId=${conversationId}`
    );
  },
};
