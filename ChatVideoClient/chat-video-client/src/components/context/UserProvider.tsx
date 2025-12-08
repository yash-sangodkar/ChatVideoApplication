import { createContext, useCallback, useState } from "react";
import type { UserLoggedInDetails } from "../../types/global";

interface UserContextProps {
  children: React.ReactNode;
}

interface UserContextType {
  userDetails: UserLoggedInDetails | null;
  setUserDetails: (user: UserLoggedInDetails | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

function UserProvider({ children }: UserContextProps) {
  const [userDetails, setUserDetails] = useState<UserLoggedInDetails | null>(
    null
  );

  const setUserDetailsHandler = useCallback(
    (user: UserLoggedInDetails | null) => {
      if (user) {
        sessionStorage.setItem("UserId", user.id);
        setUserDetails(user);
      }
    },
    []
  );
  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails: setUserDetailsHandler }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
