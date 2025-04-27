/**
 * Chat Component
 * Main messaging interface for channel communication
 */
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import "./Chat.scss";
import {
  AddCircleOutline,
  CardGiftcardOutlined,
  EmojiEmotionsOutlined,
} from "@mui/icons-material";
import GifIcon from "@mui/icons-material/Gif";
import Message from "./Message";
import { useAppSelector } from "../app/hooks";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  FieldValue,
  Firestore,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import useSubCollection from "../hooks/useSubCollection";

/**
 * Interface for message data structure
 */
interface MessageData {
  timestamp: Timestamp;
  message: string;
  user: {
    userId: string;
    profileImageUrl: string;
    emailAddress: string;
    displayName: string;
  };
}

/**
 * ChatMessaging component
 * Displays and manages messages in the current channel
 */
const ChatMessaging: React.FC = () => {
  // Get user and channel data from Redux store
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const activeChannelId = useAppSelector((state) => state.channel.activeChannelId);
  const activeChannelName = useAppSelector((state) => state.channel.activeChannelName);

  // State for message input field
  const [messageText, setMessageText] = useState<string>("");

  // Fetch channel messages using custom hook
  const { subDocuments: channelMessages } = useSubCollection("channels", "messages");

  /**
   * Send a new message to the current channel
   * Adds message document to Firestore with user data and timestamp
   */
  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    if (!messageText.trim() || !activeChannelId) return;

    try {
      // Create reference to the messages subcollection for this channel
      const messagesCollection = collection(
        db,
        "channels",
        String(activeChannelId),
        "messages"
      );

      // Add the new message document
      await addDoc(
        messagesCollection,
        {
          timestamp: serverTimestamp(),
          message: messageText,
          user: currentUser,
        }
      );

      // Clear the input field after sending
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat">
      {/* Channel header with name and options */}
      <ChatHeader channelName={activeChannelName} />

      {/* Message display area */}
      <div className="chatMessages">
        {channelMessages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>

      {/* Message input area */}
      <div className="chatInput">
        <AddCircleOutline fontSize="large" />
        <form>
          <input
            type="text"
            placeholder={`Send a message to #${activeChannelName}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessageText(e.target.value)
            }
            value={messageText}
            disabled={!activeChannelId}
          />
          <button
            type="submit"
            className="chatInputButton"
            disabled={!activeChannelId}
            onClick={sendMessage}
          >
            Send
          </button>
        </form>

        {/* Message enhancement options */}
        <div className="chatInputIcons">
          <CardGiftcardOutlined />
          <GifIcon />
          <EmojiEmotionsOutlined />
        </div>
      </div>
    </div>
  );
};

export default ChatMessaging;
