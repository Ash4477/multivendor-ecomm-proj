import { useState } from "react";
import { faqData } from "../static/data";
import Header from "../components/Layout/Header/Header";
import styled, { keyframes } from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const slideDown = keyframes`
  0% {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }
  100% {
    max-height: 500px;
    opacity: 1;
    overflow: hidden;
  }
`;

const Content = styled.div`
  padding: 2rem 3rem;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.li`
  border-top: 1px solid #4a4a4a;
  padding-top: 1rem;
  cursor: pointer;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AnswerTag = styled.p`
  animation: ${slideDown} 0.3s ease-in forwards;
`;

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState();

  const toggleActiveTab = (id) => {
    if (activeTab === id) setActiveTab(0);
    else setActiveTab(id);
  };

  return (
    <>
      <Header activeHeading={4} />
      <Content>
        <h1>FAQ</h1>
        <List>
          {faqData &&
            faqData.map((data) => (
              <ListItem onClick={() => toggleActiveTab(data.id)}>
                <FlexDiv>
                  <h3>{data.question}</h3>
                  {data.id === activeTab ? (
                    <RxCross2 size={25} />
                  ) : (
                    <AiOutlineArrowRight size={25} />
                  )}
                </FlexDiv>
                {activeTab === data.id && <AnswerTag>{data.answer}</AnswerTag>}
              </ListItem>
            ))}
        </List>
      </Content>
    </>
  );
};

export default FAQPage;
