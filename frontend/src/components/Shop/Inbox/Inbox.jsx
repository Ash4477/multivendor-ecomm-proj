import axios from "axios";
import socketIO from "socket.io-client";
import { toast } from "react-toastify";
import { SERVER_URL, ENDPOINT } from "../../../server";
import { useEffect, useState } from "react";
import ChatTile from "./ChatTile";
import ShopChat from "./ShopChat";
import { useSelector } from "react-redux";

const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(-1);
  const { shop } = useSelector((state) => state.shop);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/conversations/shop`, { withCredentials: true })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            "Cant get conversations from server at the moment"
        );
      });
  }, [activeChat]);
  // I've put activeChat in useEffect, so when user goes back to convo list, lastMessage is updated

  useEffect(() => {
    socket.emit("addUser", shop._id);
    socket.on("getUsers", (data) => setOnlineUsers(data));

    return () => socket.off("getUsers");
  }, [shop]);

  return activeChat === -1 ? (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ paddingBottom: "0.5rem", borderBottom: "1px solid grey" }}>
        All Messages
      </h1>
      {conversations.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>No conversations yet.</p>
      ) : (
        conversations.map((convo, idx) => (
          <div key={convo._id} onClick={() => setActiveChat(idx)}>
            <ChatTile
              active={onlineUsers.includes(convo.members.user._id)}
              user={convo.members.user}
              lastMessage={convo.lastMessage}
              lastUser={
                shop._id === convo.lastMessageId
                  ? "You"
                  : convo.members.user.name.split(" ")[0]
              }
            />
          </div>
        ))
      )}
    </div>
  ) : (
    <ShopChat
      shop={shop}
      data={conversations[activeChat]}
      setActiveChat={setActiveChat}
      active={onlineUsers.includes(conversations[activeChat].members.user._id)}
    />
  );
};

export default Inbox;
