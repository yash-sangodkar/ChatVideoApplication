import { useCallback, useContext, useEffect, useState } from "react";
import ConversationService from "../services/ConversationService";
import { UserContext } from "./context/UserProvider";
import { LoadingContext } from "./context/LoaderProvider";
import helper from "../helper";
import { ConversationContext } from "./context/ConversationProvider";
import NewConversationModal from "./modals/NewConversationModal";

function ConversationList() {
  const { conversations, conversationDispatcher } = useContext(ConversationContext)!;
  const loggedOnUser = useContext(UserContext)?.userDetails;
  const setIsLoading = useContext(LoadingContext)?.setLoader;
  const setSelectedConversation = useContext(ConversationContext)?.setSelectedConversation!;
  const [isNewConversationModalEnabled, setIsNewConversationModalEnabled] = useState(false);

  useEffect(() => {
    if (!loggedOnUser) return;

    setIsLoading?.(true);
    ConversationService.getConversationsByUserId(loggedOnUser?.id as string)
      .then((response) => {
        conversationDispatcher({ type: "SET_CONVERSATIONS", payload: response });
        setIsLoading?.(false);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        setIsLoading?.(false);
      });
  }, [loggedOnUser]);

  const getUserExceptLoggedInUser = useCallback(helper.getUserExceptLoggedInUser, [loggedOnUser]);

  return (
    <>
      <nav className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2 text-gray-500 uppercase text-xs">
          Conversations
          <button
            id="newChatBtn"
            className="text-blue-600 text-xs font-semibold hover:underline"
            onClick={() => setIsNewConversationModalEnabled(true)}
          >
            + New
          </button>
          {isNewConversationModalEnabled && (
            <NewConversationModal setIsNewConversationModalEnabled={setIsNewConversationModalEnabled} />
          )}
        </div>
        {conversations && (
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
              >
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-blue-100 rounded transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {helper.getAbbrivation(getUserExceptLoggedInUser(conversation).username)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {getUserExceptLoggedInUser(conversation)?.username}
                    </div>
                    <div className="text-xs text-gray-400 truncate">{conversation.lastestMessage}</div>
                  </div>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}

export default ConversationList;
