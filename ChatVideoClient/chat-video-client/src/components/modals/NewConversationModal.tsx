import type React from "react";
import { useContext, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { UserContext } from "../context/UserProvider";
import type {
  ConversationsForDisplay,
  CreateConversation,
  Message,
  UserLoggedInDetails,
} from "../../types/global";
import { LoadingContext } from "../context/LoaderProvider";
import ConversationService from "../../services/ConversationService";
import { ConversationContext } from "../context/ConversationProvider";
import { CONVERSATIONS_ACTIONS, MESSAGES_ACTIONS } from "../../types/definedTypes";
import { MessagesContext } from "../context/MessagesProvider";

interface NewConversationModalProps {
  setIsNewConversationModalEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}
function NewConversationModal({ setIsNewConversationModalEnabled }: NewConversationModalProps) {
  const currentUser = useContext(UserContext)?.userDetails;
  const { conversationDispatcher, setSelectedConversation } = useContext(ConversationContext)!;
  const messagesDispatcher = useContext(MessagesContext)?.messagesDispatcher!;
  const setLoader = useContext(LoadingContext)?.setLoader!;
  const [users, setUsers] = useState<UserLoggedInDetails[]>();

  useEffect(() => {
    setLoader(true);
    UserService.getUsersForChatInitiation(currentUser?.id as string)
      .then((data) => {
        setUsers(data);
      })
      .finally(() => setLoader(false));
  }, []);

  async function createConversation(recepientUserId: string) {
    var message: Message = {
      fromUserId: currentUser?.id as string,
      toUserId: recepientUserId,
      content: "Hi..",
      timestamp: new Date().toISOString(),
    };

    var conversation: CreateConversation = {
      InitiatorId: currentUser?.id as string,
      RecipientId: recepientUserId,
      Message: message,
    };

    var conversationForDisplay: ConversationsForDisplay = await ConversationService.createConversation(
      conversation
    );
    conversationDispatcher({ type: CONVERSATIONS_ACTIONS.ADD_CONVERSATION, payload: conversationForDisplay });
    setSelectedConversation(conversationForDisplay);
    messagesDispatcher({ type: MESSAGES_ACTIONS.ADD_MESSAGE, payload: message });
  }

  return (
    <div className="bg-white w-64 p-4 rounded shadow absolute top-[173px] left-[18%] z-[2]">
      <div className="font-semibold text-sm mb-3">Start New Conversation</div>
      <div className="space-y-2">
        {users?.map((user) => (
          <button
            key={user.id}
            className="w-full text-left px-3 py-2 hover:bg-blue-100 rounded"
            onClick={() => createConversation(user.id)}
          >
            {user.username}
          </button>
        ))}
      </div>
      <button
        id="closeModal"
        className="mt-4 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-semibold"
        onClick={() => setIsNewConversationModalEnabled(false)}
      >
        Cancel
      </button>
    </div>
  );
}

export default NewConversationModal;
