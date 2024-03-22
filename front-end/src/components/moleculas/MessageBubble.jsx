import React from "react";

function MessageBubble({ content }) {
  return (
    <div className="bg-gray-200 border border-gray-600 p-2 rounded-xl">
      {content}
    </div>
  );
}

export default MessageBubble;