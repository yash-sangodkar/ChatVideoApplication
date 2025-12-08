interface ChatHeaderProps {
  otherUserName: string;
}
function ChatHeader({ otherUserName }: ChatHeaderProps) {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-8 border-b">
      <div className="flex items-center space-x-3">
        <div className="font-bold text-lg">{`Chat with ${otherUserName}`}</div>
        {/* <!-- Presence Indication --> */}
        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
        <span className="text-xs text-green-600">Online</span>
      </div>
      {/* <!-- Call, Screen, More --> */}
      <div className="flex items-center space-x-4">
        <button
          className="rounded-full bg-blue-500 text-white p-2 transition hover:bg-blue-600"
          title="Start Video Call"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 16V8c0-1.105.895-2 2-2h7a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2z"
            />
          </svg>
        </button>
        <button
          className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
          title="Screen Share"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M9.75 17v-2.25M14.25 17v-2.25M9.75 12.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75M21 18a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h7l2 2h5a2 2 0 012 2v9z"
            />
          </svg>
        </button>
        <button className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              cx="12"
              cy="12"
              r="2"
            />
            <circle
              cx="12"
              cy="5"
              r="2"
            />
            <circle
              cx="12"
              cy="19"
              r="2"
            />
          </svg>
        </button>
        {/* <!-- Notifications bell --> */}
        <button
          className="relative rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
          title="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">3</span>
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
