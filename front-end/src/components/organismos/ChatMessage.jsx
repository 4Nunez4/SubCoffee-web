import React from "react";
import Avatar from "../atomos/Avatar";
import MessageBubble from "../moleculas/MessageBubble";

function ChatMessage({ src, alt, name, content, time }) {
    return (
        <div className="flex items-center gap-x-2">
            <div>
                <Avatar src={src} alt={alt} />
                <p className="text-xs text-center">{name}</p>
            </div>
            <div className="">
                <MessageBubble content={content} />
                <p className="text-xs">{time}</p>
            </div>
        </div>
    );
}

export default ChatMessage;