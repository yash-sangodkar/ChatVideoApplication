import { useContext, useEffect, useMemo, useRef } from "react";
import ConversationList from "./ConversationList";
import { UserContext } from "./context/UserProvider";
import helper from "../helper";
import { SignalRContext } from "./context/SignalRProvider";
import type { SendMessageRequest } from "../types/global";
import { ConversationContext } from "./context/ConversationProvider";
import { CONVERSATIONS_ACTIONS, MESSAGES_ACTIONS } from "../types/definedTypes";
import { MessagesContext } from "./context/MessagesProvider";

interface SidePanelProps {
  onSetIsUserLoggedIn: (loggedIn: boolean) => void;
}

function SidePanel({ onSetIsUserLoggedIn: onSetUserLoggedIn }: SidePanelProps) {
  const userData = useContext(UserContext)?.userDetails;
  const connection = useContext(SignalRContext)?.connection;
  const { selectedConversation, conversationDispatcher } = useContext(ConversationContext)!;
  const { messagesDispatcher } = useContext(MessagesContext)!;

  const selectedConversationRef = useRef(selectedConversation);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  useEffect(() => {
    connection?.on("OnNewMessageReceived", newMessageReceivedHandler);

    return () => {
      connection?.off("OnNewMessageReceived", newMessageReceivedHandler);
    };
  }, [connection]);

  function newMessageReceivedHandler(message: SendMessageRequest) {
    if (message.conversationId === selectedConversationRef.current?.id) {
      messagesDispatcher({ type: MESSAGES_ACTIONS.ADD_MESSAGE, payload: message });
    }
    conversationDispatcher({
      type: CONVERSATIONS_ACTIONS.UPDATE_LAST_MESSAGE,
      payload: { conversationId: message.conversationId, lastestMessage: message.content },
    });
  }

  function logOutUser() {
    sessionStorage.removeItem("UserId");
    onSetUserLoggedIn(false);
  }

  const userAbbreviation = useMemo(() => {
    return helper.getAbbrivation(userData?.username || "");
  }, [userData?.username]);

  return (
    <>
      <aside className="w-72 bg-white border-r flex flex-col">
        {/* //App Logo & Title */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-700 flex items-center justify-center text-white font-bold">
              VC
            </span>
            <span className="font-bold text-lg text-blue-700">VideoCall App</span>
          </div>
        </div>
        {/* User Profile & Presence */}
        <div className="p-4 flex items-center space-x-3 border-b">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {userAbbreviation}
          </div>
          <div>
            <div className="font-medium">{userData?.username}</div>
            <div className="flex items-center text-xs text-green-600">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Online
            </div>
          </div>
        </div>
        {/* <!-- Conversation List --> */}
        <ConversationList />
        {/* <!-- Settings/Logout --> */}
        <div className="p-4 border-t">
          <button
            className="w-full py-2 bg-gray-200 rounded text-gray-700 font-semibold hover:bg-gray-300"
            onClick={logOutUser}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default SidePanel;
