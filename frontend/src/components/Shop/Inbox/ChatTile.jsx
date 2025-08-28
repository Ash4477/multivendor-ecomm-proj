import styled from "styled-components";
import { ImageDiv, Image } from "../../../styled-comps/commonComps";
import { BACKEND_URL } from "../../../server";

const ChatDiv = styled.div`
  cursor: pointer;
  border-bottom: 1px solid grey;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s linear;

  &:hover {
    background-color: #6b6a6a;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActiveCheck = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #07b907;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ChatTile = ({ active, user, lastMessage, lastUser }) => {
  return (
    <ChatDiv>
      <div style={{ position: "relative" }}>
        <ImageDiv $rounded $width="50px" $height="50px">
          <Image
            src={`${BACKEND_URL}/${user?.avatar}`}
            alt="user profile image"
          />
        </ImageDiv>
        {active && <ActiveCheck />}
      </div>
      <Col>
        <b>
          {user.name}{" "}
          <span
            style={{
              fontWeight: "normal",
              fontFamily: "Roboto",
              color: "grey",
              fontSize: "12px",
            }}
          >
            {active && "(Active)"}
          </span>
        </b>
        <p style={{ fontSize: "14px", color: "#cec9c9" }}>
          {lastMessage && `${lastUser}: ${lastMessage}`}
        </p>
      </Col>
    </ChatDiv>
  );
};

export default ChatTile;
