import type { Message } from "../types/global";
import { MESSAGES_ACTIONS } from "../types/definedTypes";

export type MessagesState = Message[];

export type MessagesReducerAction =
  | { type: typeof MESSAGES_ACTIONS.SET_MESSAGES; payload: Message[] }
  | { type: typeof MESSAGES_ACTIONS.ADD_MESSAGE; payload: Message };

export const initialMessagesState: MessagesState = [];

export function messagesReducer(state: MessagesState, action: MessagesReducerAction): MessagesState {
  switch (action.type) {
    case MESSAGES_ACTIONS.SET_MESSAGES:
      return action.payload;
    case MESSAGES_ACTIONS.ADD_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}
