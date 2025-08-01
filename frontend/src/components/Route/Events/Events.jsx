import EventCard from "./EventCard";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 3rem;
  padding: 0 3rem;
`;

const Events = () => {
  return (
    <Container>
      <h2>Popular Events</h2>
      <EventCard />
    </Container>
  );
};

export default Events;
