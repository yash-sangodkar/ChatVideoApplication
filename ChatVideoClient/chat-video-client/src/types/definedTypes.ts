export const API_ENDPOINTS = {
  conversation: "/api/conversation",
  user: "/api/user",
  messages: "/api/messages",
};

export const CONVERSATIONS_ACTIONS = {
  SET_CONVERSATIONS: "SET_CONVERSATIONS",
  ADD_CONVERSATION: "ADD_CONVERSATION",
  CLEAR_CONVERSATIONS: "CLEAR_CONVERSATIONS",
  UPDATE_LAST_MESSAGE: "UPDATE_LAST_MESSAGE",
} as const;

export const MESSAGES_ACTIONS = {
  SET_MESSAGES: "SET_MESSAGES",
  ADD_MESSAGE: "ADD_MESSAGE",
} as const;
