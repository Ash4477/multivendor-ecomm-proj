import Header from "../components/Layout/Header/Header";
import EventCard from "../components/Route/Events/EventCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../server";
import { toast } from "react-toastify";
import Loader from "../components/Layout/Loader/Loader";

const Content = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EventsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/events`)
      .then((res) => setData(res.data.events))
      .catch(() => toast.error("Server down"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;
  return (
    <>
      <Header activeHeading={3} />
      <Content>
        <h1 style={{ margin: "-1rem 0" }}>All Events</h1>
        {data.map((ev) => (
          <EventCard data={ev} />
        ))}
      </Content>
    </>
  );
};

export default EventsPage;
