import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../server";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActivationPage = () => {
  const [error, setError] = useState(false);
  const { activationToken } = useParams();

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${SERVER_URL}/users/activation`, {
            activationToken,
          });
          console.log(res.data.message);
        } catch (err) {
          console.log(err.response, err.response.data.message);
          setError(true);
        }
      };

      activationEmail();
    }
  }, [activationToken]);

  return (
    <Container>
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </Container>
  );
};

export default ActivationPage;
