import { useCallback, useContext, useEffect, useRef, type JSX } from "react";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import VideoCallModal from "./modals/VideoCallModal";
import { ConversationContext } from "./context/ConversationProvider";
import MessageService from "../services/MessageService";
import { LoadingContext } from "./context/LoaderProvider";
import helper from "../helper";
import type { ConversationsForDisplay, Message } from "../types/global";
import { UserContext } from "./context/UserProvider";

import { MessagesContext } from "./context/MessagesProvider";

function CenterChatPanel() {
  const selectedConversation = useContext(ConversationContext)?.selectedConversation;
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const loggedOnUser = useContext(UserContext)?.userDetails;
  const messageContext = useContext(MessagesContext);
  const setIsLoading = useContext(LoadingContext)?.setLoader;

  const getUserExceptLoggedInUser = useCallback(helper.getUserExceptLoggedInUser, []);

  useEffect(() => {
    if (!selectedConversation) return;
    setIsLoading?.(true);
    MessageService.getMessagesByConversationId(selectedConversation?.id as string)
      .then((response) => {
        messageContext?.messagesDispatcher({ type: "SET_MESSAGES", payload: response });
        setIsLoading?.(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setIsLoading?.(false);
      });
    console.log("Selected Conversation changed:", selectedConversation);
  }, [selectedConversation]);

  useEffect(() => {
    chatMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageContext?.messages]);

  function isSentByLoggedInUser(message: Message): boolean {
    const loggedInUserId = sessionStorage.getItem("UserId");
    return message.fromUserId === loggedInUserId;
  }

  function getMessageBoxHTML(message: Message): JSX.Element {
    const isByLoggedInUser = isSentByLoggedInUser(message);
    const abbreviation = helper.getAbbrivation(
      isByLoggedInUser
        ? loggedOnUser?.username || ""
        : getUserExceptLoggedInUser(selectedConversation as ConversationsForDisplay).username
    );

    if (isByLoggedInUser) {
      // Sent by logged-in user
      return (
        <div
          key={message.timestamp}
          className="flex items-end space-x-3 flex-row-reverse"
        >
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
            {abbreviation}
          </div>
          <div>
            <div className="bg-blue-100 px-4 py-2 rounded-t-xl rounded-bl-xl shadow border max-w-xs ml-auto">
              {message.content}
            </div>
            <div className="text-xs text-gray-400 text-right mt-1">{message.timestamp}</div>
          </div>
        </div>
      );
    }

    // Received message
    return (
      <div
        key={message.timestamp}
        className="flex items-end space-x-3"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {abbreviation}
        </div>
        <div>
          <div className="bg-white px-4 py-2 rounded-t-xl rounded-br-xl shadow border max-w-xs">
            {message.content}
          </div>
          <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="flex-1 h-screen flex flex-col relative">
        {selectedConversation ? (
          <>
            <ChatHeader otherUserName={getUserExceptLoggedInUser(selectedConversation).username} />
            <section className="flex-1 flex flex-col overflow-y-auto px-8 py-4 bg-gray-50">
              <div className="flex flex-col space-y-4">
                {messageContext?.messages.map((message) => getMessageBoxHTML(message))}
                <div ref={chatMessagesRef} />
              </div>
            </section>
            <ChatFooter />
          </>
        ) : (
          <section
            id="noChatScreen"
            className="flex-1 flex flex-col items-center justify-center text-center bg-gray-50"
          >
            <div className="text-5xl mb-4">💬</div>
            <div className="font-bold text-xl mb-2 text-gray-700">No Conversation Selected</div>
            <div className="text-gray-500 max-w-sm">
              Choose a conversation from the left or start a new one to begin chatting.
            </div>
          </section>
        )}

        {/* <!-- Video Call Overlay (hidden by default) --> */}
        <VideoCallModal />
      </main>
    </>
  );
}

export default CenterChatPanel;
