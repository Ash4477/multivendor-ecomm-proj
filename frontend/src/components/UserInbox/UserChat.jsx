import axios from "axios";
import styled from "styled-components";
import socketIO from "socket.io-client";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { useState, useEffect, useRef } from "react";
import { Input } from "../../styled-comps/formComps";
import { FancyButton, Image, ImageDiv } from "../../styled-comps/commonComps";
import { BACKEND_URL, ENDPOINT, SERVER_URL } from "../../server";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import Loader from "../Layout/Loader/Loader";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Container = styled.div`
  padding: 2rem;
  min-height: 80vh;
  height: 100%;
  flex: 2;
`;

const HeaderDiv = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px solid grey;
  padding-bottom: 1rem;
`;

const Main = styled.div`
  height: 85%;
  padding: 1rem 0;
`;

const MessagesDiv = styled.div`
  padding: 0 1rem;
  overflow-y: auto;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BubbleWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;
  width: max-content;
  align-self: ${({ $you }) => ($you ? "flex-end" : "flex-start")};

  &:hover {
    p {
      display: block;
    }
  }
`;

const Bubble = styled.div`
  background-color: ${({ $you }) =>
    $you ? "var(--color-1)" : "var(--color-5)"};
  border-radius: 15px;
  padding: 0.5rem 1rem;
`;

const TimeText = styled.p`
  font-family: Roboto, sans-serif;
  color: grey;
  font-size: 12px;
  display: none;
`;

const Row = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserChat = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { id } = useParams();
  const { active } = useSearchParams;
  const newMessageRef = useRef();
  const lastMessageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setIsDataLoading(true);
    axios
      .get(`${SERVER_URL}/conversations/${id}/user`, { withCredentials: true })
      .then((res) => setData(res.data.conversation))
      .catch((err) =>
        toast.error(err.response?.data?.message || "cant get chat from server")
      )
      .finally(() => setIsDataLoading(false));
  }, [id]);

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      axios
        .get(`${SERVER_URL}/messages/conversation/${id}`)
        .then((res) => {
          setMessages(res.data.messages);
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "cant get messages from server"
          );
        })
        .finally(() => setIsLoading(false));
    }
  }, [data, id]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: data.createdAt,
      });
    });

    return () => {
      socket.off("getMessage");
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      data?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, data]);

  useEffect(() => {
    newMessageRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messages && messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({
        behaviour: "smooth",
        block: "end",
      });
    }
  }, [messages, lastMessageRef]);

  const updateLastMessage = () => {
    const lastMessageData = {
      lastMessage: newMessage,
      lastMessageId: user._id,
    };

    socket.emit("updateLastMessage", lastMessageData);

    axios
      .put(
        `${SERVER_URL}/conversations/${data._id}/last-message`,
        lastMessageData
      )
      .then(() => {
        setNewMessage("");
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "cant update last message")
      );
  };

  const handleMessageSent = () => {
    if (newMessage === "") {
      toast.info("Enter something first");
      return;
    }

    const message = {
      sender: user._id,
      text: newMessage,
      conversation: data._id,
    };

    const receiverId = data.members.shop._id;

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    axios
      .post(`${SERVER_URL}/messages`, message, { withCredentials: true })
      .then((res) => {
        setMessages([...messages, res.data.message]);
        updateLastMessage();
        setNewMessage("");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "cant send message");
      });
  };

  if (!data) return <p>No Chat</p>;

  return (
    <Container>
      <HeaderDiv>
        <Row>
          <ImageDiv $rounded $width="50px" $height="50px">
            <Image
              src={`${BACKEND_URL}/${data.members.shop?.avatar}`}
              alt="shop profile image"
            />
          </ImageDiv>
          <Col>
            <p>{data.members.shop.name}</p>
            <p style={{ fontSize: "12px", color: "grey" }}>
              {active ? "Online" : "Offline"}
            </p>
          </Col>
        </Row>
        <Row
          onClick={() => navigate("/user/inbox")}
          style={{ cursor: "pointer" }}
        >
          <AiOutlineArrowLeft size={25} />
          Go To All Chats
        </Row>
      </HeaderDiv>
      <Main>
        <MessagesDiv>
          {isLoading || isDataLoading ? (
            <Loader />
          ) : (
            messages.map((msg, idx) => {
              const you = msg.sender === user._id;
              return (
                <BubbleWrapper
                  $you={you}
                  key={msg._id}
                  ref={idx === messages.length - 1 && lastMessageRef}
                >
                  {you && <TimeText>{format(msg.createdAt)}</TimeText>}
                  <Bubble $you={you}>{msg.text}</Bubble>
                  {!you && <TimeText>{format(msg.createdAt)}</TimeText>}
                </BubbleWrapper>
              );
            })
          )}
        </MessagesDiv>
        <Row>
          <TfiGallery size={20} />
          <Input
            type="text"
            placeholder="Send Message to Seller"
            value={newMessage}
            ref={newMessageRef}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: 1 }}
            onKeyDown={(e) => e.key === "Enter" && handleMessageSent()}
          />
          <FancyButton $pad="0.5rem 1rem" onClick={handleMessageSent}>
            <AiOutlineSend size={20} />
          </FancyButton>
        </Row>
      </Main>
    </Container>
  );
};

export default UserChat;
