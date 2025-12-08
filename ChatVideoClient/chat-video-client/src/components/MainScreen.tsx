import { useContext, useEffect, useState } from "react";
import CenterChatPanel from "./CenterChatPanel";
import LoginRegisterModal from "./modals/LoginRegisterModal";
import SidePanel from "./SidePanel";
import ConversationProvider from "./context/ConversationProvider";
import { UserContext } from "./context/UserProvider";
import UserService from "../services/UserService";
import SignalRProvider from "./context/SignalRProvider";
import MessagesProvider from "./context/MessagesProvider";

function MainScreen() {
  const setUserDetails = useContext(UserContext)?.setUserDetails;
  const [isUserLoggedIn, setUserLoggedIn] = useState(() => {
    return sessionStorage.getItem("UserId") !== null;
  });

  useEffect(() => {
    console.log("MainScreen: isUserLoggedIn changed:", isUserLoggedIn);
    if (isUserLoggedIn) {
      UserService.getUserById(sessionStorage.getItem("UserId") as string)
        .then((user) => {
          setUserDetails?.(user);
        })
        .catch(() => {
          setUserLoggedIn(false);
          sessionStorage.removeItem("UserId");
        });
    }
  }, [isUserLoggedIn]);

  return (
    <div className="bg-gray-100 h-screen flex">
      {isUserLoggedIn ? (
        <>
          <SignalRProvider>
            <ConversationProvider>
              <MessagesProvider>
                <SidePanel onSetIsUserLoggedIn={setUserLoggedIn} />
                <CenterChatPanel />
              </MessagesProvider>
            </ConversationProvider>
          </SignalRProvider>
        </>
      ) : (
        <LoginRegisterModal onSetIsUserLoggedIn={setUserLoggedIn} />
      )}
    </div>
  );
}

export default MainScreen;
