/**
 * Sidebar Navigation Component
 * Displays server list, channels, and user profile
 */
import { ExpandMoreOutlined, Settings } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import SidebarChannel from "./SidebarChannle";
import { useAppSelector } from "../app/hooks";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import useFirebase from "../hooks/useFirebase";

/**
 * Sidebar component for navigation and channel management
 * Contains server list, channel list, and user profile section
 */
const SidebarNavigation: React.FC = () => {
  // Get authenticated user from Redux store
  const authenticatedUser = useAppSelector((state) => state.user.currentUser);

  // Fetch channels from Firestore using custom hook
  const { documents: channelList } = useFirebase("channels");

  /**
   * Creates a new channel in Firestore
   * Prompts user for channel name and adds to database
   */
  const createNewChannel = async (): Promise<void> => {
    const channelName = prompt("Create a new channel");

    if (channelName) {
      try {
        // Add new channel document to Firestore
        const channelRef: DocumentReference<DocumentData> = await addDoc(
          collection(db, "channels"),
          {
            channelName: channelName,
          }
        );
      } catch (error) {
        console.error("Error creating channel:", error);
      }
    }
  };

  return (
    <div className="sidebar">
      {/* Server navigation section */}
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="./discordLogo.png" alt="Discord Logo" />
        </div>
        <div className="serverIcon">
          <img src="./logo192.png" alt="Server Icon" />
        </div>
      </div>

      {/* Main content section */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreOutlined />
        </div>

        <div className="sidebarChannels">
          {/* Channel header with add button */}
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreOutlined />
              <h4>Programming Channels</h4>
            </div>
            <AddIcon
              className="sidebarAddChannel"
              onClick={createNewChannel}
            />
          </div>

          {/* Channel list */}
          <div className="sidebarChannelList">
            {channelList.map((channel) => (
              <SidebarChannel
                id={channel.id}
                channel={channel}
                key={channel.id}
              />
            ))}
          </div>

          {/* User profile and settings */}
          <div className="sidebarSettings">
            <div className="sidebarAccount">
              <img
                src={authenticatedUser?.profileImageUrl}
                alt="User Avatar"
                onClick={() => auth.signOut()}
              />
              <div className="accountName">
                <h4>{authenticatedUser?.displayName}</h4>
                <span>#{authenticatedUser?.userId.substring(0, 4)}</span>
              </div>
            </div>

            <div className="sidebarVoice">
              <MicIcon />
              <HeadphonesIcon />
              <Settings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
