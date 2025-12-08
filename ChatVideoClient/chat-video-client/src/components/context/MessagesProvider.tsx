import type React from "react";
import { createContext, useCallback, useReducer } from "react";
import {
  initialMessagesState,
  messagesReducer,
  type MessagesReducerAction,
  type MessagesState,
} from "../../reducers/MessageReducer";

interface MessageProviderProps {
  children: React.ReactNode;
}

interface MessageContextType {
  messages: MessagesState;
  messagesDispatcher: React.Dispatch<MessagesReducerAction>;
}

export const MessagesContext = createContext<MessageContextType | null>(null);

function MessagesProvider({ children }: MessageProviderProps) {
  const [messages, messagesDispatcher] = useReducer(messagesReducer, initialMessagesState);

  const messageDispatcherHandler = useCallback(messagesDispatcher, []);
  return (
    <MessagesContext.Provider value={{ messages, messagesDispatcher: messageDispatcherHandler }}>
      {children}
    </MessagesContext.Provider>
  );
}

export default MessagesProvider;
