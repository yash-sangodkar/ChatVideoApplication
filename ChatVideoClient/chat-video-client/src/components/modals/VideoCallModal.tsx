function VideoCallModal() {
  return (
    <div className="hidden absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-2xl flex flex-col">
        <div className="flex-1 bg-black rounded-t-lg flex items-center justify-center relative">
          {/* <!-- Placeholder for remote video stream --> */}
          <div className="w-2/3 h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Remote Video</span>
          </div>
          {/* <!-- Local video preview --> */}
          <div className="absolute bottom-4 right-4 w-32 h-20 bg-gray-600 rounded-lg flex items-center justify-center border-2 border-white">
            <span className="text-xs text-white">Your Video</span>
          </div>
        </div>
        {/* <!-- Video Controls --> */}
        <div className="flex items-center justify-center p-6 space-x-8 bg-gray-100 rounded-b-lg">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-3 transition"
            title="Mute/Unmute"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M9 19V6l-2 2H5v8h2l2 2zm6 0v-8m0 8a2 2 0 002-2v-4a2 2 0 112 0v4a4 4 0 01-4 4v2a6 6 0 006-6v-4a6 6 0 10-12 0v4a6 6 0 006 6v-2a4 4 0 01-4-4v-4a2 2 0 112 0v4a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-3 transition"
            title="Toggle Camera"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 16V8c0-1.105.895-2 2-2h7a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
            </svg>
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 rounded-full p-4 transition"
            title="End Call"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M21 17l-3.87-3.87c-1.172-1.17-3.07-1.17-4.242 0L3 17"
              />
            </svg>
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-3 transition"
            title="Screen Share"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect
                width="20"
                height="14"
                x="2"
                y="5"
                rx="2"
              />
              <path d="M8 21h8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCallModal;
