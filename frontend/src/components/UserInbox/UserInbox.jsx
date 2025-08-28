import axios from "axios";
import socketIO from "socket.io-client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SERVER_URL, ENDPOINT } from "../../server";
import ChatTile from "../Shop/Inbox/ChatTile";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const Container = styled.div`
  padding: 2rem;
  min-height: 80vh;
`;

const UserInbox = () => {
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/conversations/user`, { withCredentials: true })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            "Cant get conversations from server at the moment"
        );
      });
  }, []);

  useEffect(() => {
    socket.emit("addUser", user._id);
    socket.on("getUsers", (data) => setOnlineUsers(data));

    return () => socket.off("getUsers");
  }, [user]);

  return (
    <Container>
      <h1 style={{ paddingBottom: "0.5rem", borderBottom: "1px solid grey" }}>
        All Chats
      </h1>
      {conversations.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>No conversations yet.</p>
      ) : (
        conversations.map((convo) => {
          const isOnline = onlineUsers.includes(convo.members.shop._id);
          return (
            <div
              key={convo._id}
              onClick={() =>
                navigate(`/user/inbox/${convo._id}?active=${isOnline}`)
              }
            >
              <ChatTile
                active={isOnline}
                user={convo.members.shop}
                lastMessage={convo.lastMessage}
                lastUser={
                  user._id === convo.lastMessageId
                    ? "You"
                    : convo.members.shop.name.split(" ")[0]
                }
              />
            </div>
          );
        })
      )}
    </Container>
  );
};

export default UserInbox;
