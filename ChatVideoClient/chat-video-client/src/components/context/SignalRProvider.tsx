import { HubConnectionBuilder, type HubConnection } from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";

interface SignalRProviderProps {
  children: React.ReactNode;
}

interface SignalRContextValue {
  connection: HubConnection | null;
}

export const SignalRContext = createContext<SignalRContextValue>({ connection: null });

function SignalRProvider({ children }: SignalRProviderProps) {
  const user = useContext(UserContext)?.userDetails;
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    console.log("SignalRProvider: user changed:", user);
    if (!user) return;
    const newConnection = new HubConnectionBuilder()
      .withUrl(`https://localhost:44368/chatvideohub?userId=${user?.id}`)
      .withAutomaticReconnect()
      .build();

    newConnection.onreconnecting((error) => {
      console.warn("⚠ SignalR reconnecting due to error:", error);
    });

    newConnection.onreconnected((connectionId) => {
      console.info("🔄 SignalR reconnected. New connectionId:", connectionId);
    });

    newConnection.onclose((error) => {
      console.error(" SignalR connection closed. Reason:", error);
    });

    newConnection.on("Error", (message: string) => {
      console.error(" Server error received:", message);
    });
    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log("Connected to SignalR"))
      .catch((err) => console.log("Error connecting to SignalR: ", err));

    return () => {
      console.log("🔻 Stopping SignalR connection");
      newConnection.stop();
    };
  }, [user?.id]);

  return <SignalRContext.Provider value={{ connection }}>{children}</SignalRContext.Provider>;
}

export default SignalRProvider;
