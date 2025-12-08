import type { ConversationsForDisplay, UserLoggedInDetails } from "./types/global";

const helper = {
  getAbbrivation: (value: string) => {
    const data = value || "";
    const clean = data.trim().toLowerCase();
    const parts = clean.split(/[\s._-]+/).filter(Boolean);

    if (parts.length === 0) return "";
    const firstInitial = parts[0].charAt(0).toUpperCase();
    if (parts.length === 1) return firstInitial;
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  },
  getUserExceptLoggedInUser: (conversation: ConversationsForDisplay): UserLoggedInDetails => {
    return conversation.initiatorUser.id === sessionStorage.getItem("UserId")
      ? conversation.recipientUser
      : conversation.initiatorUser;
  },
};

export default helper;
