import React, { createContext, useCallback, useReducer, useState } from "react";
import type { ConversationsForDisplay } from "../../types/global";
import {
  conversationsReducer,
  initialConversationsState,
  type ConversationsAction,
  type ConversationState,
} from "../../reducers/ConversationsReducer";

interface ConversationProviderProps {
  children: React.ReactNode;
}

interface ConversationContextValue {
  selectedConversation: ConversationsForDisplay | undefined;
  setSelectedConversation: React.Dispatch<React.SetStateAction<ConversationsForDisplay | undefined>>;
  conversations: ConversationState | null;
  conversationDispatcher: React.Dispatch<ConversationsAction>;
}

export const ConversationContext = createContext<ConversationContextValue | null>(null);

function ConversationProvider({ children }: ConversationProviderProps) {
  const [selectedConversation, setSelectedConversation] = useState<ConversationsForDisplay | undefined>();
  const [conversations, conversationDispatcher] = useReducer(conversationsReducer, initialConversationsState);

  const conversationDispatcherHandler = useCallback(conversationDispatcher, []);

  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation: setSelectedConversation,
        conversations,
        conversationDispatcher: conversationDispatcherHandler,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export default ConversationProvider;
