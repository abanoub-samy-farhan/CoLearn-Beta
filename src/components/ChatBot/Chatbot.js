import React, { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

export default function ChatbotModal({ setIsChatOpen, isChatOpen }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, how can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const chatContainerRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setMessage("");
    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
      },
      { role: "assistant", content: "" },
    ]);

    const response = await fetch("http://localhost:5500/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, { role: "user", content: message }],
      }),
    });
    setLoading(false);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = "";
    return reader.read().then(function processText({ done, value }) {
      if (done) {
        return result;
      }

      const text = decoder.decode(value || new Int8Array(), { stream: true });
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessage.content + text },
        ];
      });
      return reader.read().then(processText);
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 flex items-end justify-center lg:items-center bg-gray-800 bg-opacity-50 z-50 ease-in-out duration-300">
          <div className="bg-white rounded-t-full lg:rounded-lg shadow-lg w-full lg:w-1/3 h-2/3 flex flex-col">
            {/* Header */}
            <div className="bg-purple-600 text-white p-4 flex justify-between items-center rounded-t-lg">
              <h3 className="text-lg font-semibold">Chat with CoLearn Assistant</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200 transition-colors ease-in-out"
              >
                &times;
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-purple-500 text-white"
                        : (loading && index == (messages.length - 1)) ? "transparent" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                    {loading && index == (messages.length - 1) && (
                      <div className="dot-flashing"></div>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="p-4 bg-gray-100 flex rounded-b-lg">
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={sendMessage}
                className="transparent text-black px-4 py-2 rounded-md ml-2"
              >
                <BiSend className="hover:text-purple-700" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
