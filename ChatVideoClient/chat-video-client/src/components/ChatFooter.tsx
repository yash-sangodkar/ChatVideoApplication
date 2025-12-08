import { useContext, useMemo, useRef } from "react";
import { UserContext } from "./context/UserProvider";
import { ConversationContext } from "./context/ConversationProvider";
import { SignalRContext } from "./context/SignalRProvider";
import type { ConversationsForDisplay, SendMessageRequest } from "../types/global";
import helper from "../helper";
import { CONVERSATIONS_ACTIONS, MESSAGES_ACTIONS } from "../types/definedTypes";
import { MessagesContext } from "./context/MessagesProvider";

function ChatFooter() {
  const user = useContext(UserContext)?.userDetails;
  const { selectedConversation, conversationDispatcher } = useContext(ConversationContext)!;
  const messagesDispatcher = useContext(MessagesContext)?.messagesDispatcher!;
  const connection = useContext(SignalRContext)?.connection;
  const toUserId = useMemo(
    () => helper.getUserExceptLoggedInUser(selectedConversation as ConversationsForDisplay).id,
    [selectedConversation]
  );

  function sendMessage() {
    if (!connection || !user || !selectedConversation) return;
    const messageContent = content.current?.value;
    if (!messageContent || messageContent.trim() === "") return;

    const newMessage: SendMessageRequest = {
      conversationId: selectedConversation.id,
      content: messageContent,
      fromUserId: user.id,
      toUserId: toUserId,
      timestamp: new Date().toISOString(),
    };

    sendMessageViaSignalR(newMessage);
    conversationDispatcher({
      type: CONVERSATIONS_ACTIONS.UPDATE_LAST_MESSAGE,
      payload: { conversationId: newMessage.conversationId, lastestMessage: newMessage.content },
    });
    messagesDispatcher({ type: MESSAGES_ACTIONS.ADD_MESSAGE, payload: newMessage });
  }

  function sendMessageViaSignalR(newMessage: SendMessageRequest) {
    if (!connection) {
      console.error("SignalR connection not available");
      return;
    }
    connection
      .invoke("OnSendMessage", newMessage)
      .then(() => {
        if (content.current) content.current.value = "";
      })
      .catch((err) => console.error("Error sending message:", err));
  }

  const content = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-2 flex items-center space-x-4">
      <input
        type="text"
        ref={content}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none bg-white"
      />
      <button
        type="button"
        className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 font-semibold"
        onClick={sendMessage}
      >
        Send
      </button>
      <button
        title="Attach"
        type="button"
        className="bg-gray-100 rounded-full p-2 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-width="2"
            d="M15.172 7l-6.586 6.586A2 2 0 1012 17h7a2 2 0 112 2H12a4 4 0 110-8l6.586-6.586a2 2 0 112.828 2.828L8.828 16.828"
          />
        </svg>
      </button>
    </div>
  );
}

export default ChatFooter;
