import styled from "styled-components";
import { Image, ImageDiv } from "../../styled-comps/commonComps";
import { BACKEND_URL, SERVER_URL } from "../../server";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { InputDiv, Input, TextArea } from "../../styled-comps/formComps";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserOrders } from "../../redux/actions/order";

const Container = styled.div`
  border-top: 1px solid grey;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $jc }) => $jc || undefined};
  align-items: ${({ $ai }) => $ai || undefined};
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: ${({ $jc }) => ($jc ? $jc : "space-between")};
`;

const Button = styled.button`
  padding: 0.2rem 1rem;
  background-color: var(--color-1);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* dim background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: var(--color-4);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserOrderListItem = ({ data, isDelivered, orderId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleReviewSubmit = () => {
    axios
      .put(
        `${SERVER_URL}/products/${data._id}/review`,
        {
          orderId,
          comment,
          rating,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Review Published Successfully");
        dispatch(getUserOrders(userId));
        setIsOpen(false);
        setComment("");
        setRating(1);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Review Submission Failed");
      });
  };

  return (
    <Container>
      {isOpen && (
        <ModalContainer>
          <Modal>
            <RxCross1
              size={20}
              onClick={() => setIsOpen(false)}
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
            />
            <h2
              style={{
                borderBottom: "1px solid grey",
                marginBottom: "0.5rem",
                paddingBottom: "0.5rem",
              }}
            >
              Review
            </h2>
            <Row $jc="start">
              <ImageDiv $width="100px">
                <Image src={`${BACKEND_URL}/uploads/${data.images[0]}`} />
              </ImageDiv>
              <Col $ai="flex-start">
                <h3>{data.name}</h3>
                <p>Price: US ${data.discountPrice}</p>
              </Col>
            </Row>
            <h3 style={{ marginTop: "0.5rem" }}>Feeback</h3>
            <InputDiv>
              <TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="review-box"
                type="text"
                placeholder="How was the product? (optional)"
              />
            </InputDiv>
            <h3 style={{ marginTop: "0.5rem" }}>Rate the Product</h3>
            <Row $ai="center">
              <Row $jc="flex-start">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      size={25}
                      key={i}
                      color="rgb(246,186,0)"
                      style={{ cursor: "pointer" }}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      size={25}
                      key={i}
                      color="rgb(246,186,0)"
                      style={{ cursor: "pointer" }}
                      onClick={() => setRating(i)}
                    />
                  )
                )}
              </Row>
              <Button onClick={handleReviewSubmit}>Submit</Button>
            </Row>
          </Modal>
        </ModalContainer>
      )}
      <Row>
        <ImageDiv $width="50px">
          <Image src={`${BACKEND_URL}/uploads/${data.images[0]}`} />
        </ImageDiv>
        <Col>
          <p>{data.name}</p>
          <p>
            ${data.discountPrice} x {data.quantity}
          </p>
        </Col>
      </Row>
      {isDelivered && (
        <Button onClick={() => setIsOpen(true)}>
          {data.isReviewed ? "Update Review" : "Write a Review"}
        </Button>
      )}
    </Container>
  );
};

export default UserOrderListItem;
