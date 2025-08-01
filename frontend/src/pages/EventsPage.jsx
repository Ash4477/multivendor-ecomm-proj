import Header from "../components/Layout/Header/Header";
import EventCard from "../components/Route/Events/EventCard";
import styled from "styled-components";

const Content = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EventsPage = () => {
  return (
    <>
      <Header activeHeading={3} />
      <Content>
        <EventCard />
        <EventCard />
      </Content>
    </>
  );
};

export default EventsPage;
