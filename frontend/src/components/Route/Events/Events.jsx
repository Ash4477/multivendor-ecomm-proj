import EventCard from "./EventCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../server";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader/Loader";

const Container = styled.div`
  margin-top: 3rem;
  padding: 1rem 3rem;
`;

const Events = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/events?limit=1`)
      .then((res) => setData(res.data.events))
      .catch(() => toast.error("Server down"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <h2>Popular Events</h2>
      {data.length === 0 ? (
        <p>No Events going on right now</p>
      ) : (
        <EventCard data={data[0]} />
      )}
    </Container>
  );
};

export default Events;
