import type { ConversationsForDisplay } from "../types/global";
import { CONVERSATIONS_ACTIONS } from "../types/definedTypes";

export type ConversationState = ConversationsForDisplay[];

export type ConversationsAction =
  | { type: typeof CONVERSATIONS_ACTIONS.SET_CONVERSATIONS; payload: ConversationsForDisplay[] }
  | { type: typeof CONVERSATIONS_ACTIONS.ADD_CONVERSATION; payload: ConversationsForDisplay }
  | { type: typeof CONVERSATIONS_ACTIONS.CLEAR_CONVERSATIONS }
  | {
      type: typeof CONVERSATIONS_ACTIONS.UPDATE_LAST_MESSAGE;
      payload: { conversationId: string; lastestMessage: string };
    };

export const initialConversationsState: ConversationState = [];

export function conversationsReducer(
  state: ConversationState,
  action: ConversationsAction
): ConversationState {
  switch (action.type) {
    case CONVERSATIONS_ACTIONS.SET_CONVERSATIONS:
      return action.payload;
    case CONVERSATIONS_ACTIONS.ADD_CONVERSATION:
      return [...state, action.payload];
    case CONVERSATIONS_ACTIONS.CLEAR_CONVERSATIONS:
      return [];
    case CONVERSATIONS_ACTIONS.UPDATE_LAST_MESSAGE:
      return state.map((conversation) =>
        conversation.id === action.payload.conversationId
          ? { ...conversation, lastestMessage: action.payload.lastestMessage }
          : conversation
      );
  }
}
