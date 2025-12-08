export interface ChatVideoAppIdentity {
  id: string;
}

export interface UserLoggedInDetails extends ChatVideoAppIdentity {
  username: string;
}

export interface ConversationsForDisplay {
  id: string;
  initiatorUser: UserLoggedInDetails;
  recipientUser: UserLoggedInDetails;
  createdAt: Date;
  lastestMessage: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface Message {
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: string;
}

export interface SendMessageRequest extends Message {
  conversationId: string;
}

export interface CreateConversation {
  InitiatorId: string;
  RecipientId: string;
  Message: Message;
}
