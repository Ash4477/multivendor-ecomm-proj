import { Link } from "react-router-dom";
import { Image, ImageDiv } from "../../../styled-comps/commonComps";
import PriceDiv from "../PriceDiv/PriceDiv";
import Countdown from "./Countdown";
import styled from "styled-components";
import { BACKEND_URL, SERVER_URL } from "../../../server";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const FancyButton = styled.button`
  margin-top: 1rem;
  font-weight: bold;
  background-color: black;
  color: white;
  font-family: Raleway, sans-serif;
  padding: 0.7rem 2rem;
  border-radius: 5px;
`;

const EventCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.info("Item already in cart");
      return;
    }
    const cartData = { ...data, quantity: 1 };
    dispatch(addToCart(cartData));
    toast.success("Item added to cart successfully");
  };

  return (
    <Container>
      <ImageDiv style={{ flex: "1" }}>
        <Image src={`${BACKEND_URL}/uploads/${data.images[0]}`} $rounded />
      </ImageDiv>
      <div style={{ flex: "2" }}>
        <Title>{data.name}</Title>
        <p style={{ marginBottom: "1rem" }}>{data.description}</p>
        <PriceDiv
          discount_price={data.discountPrice}
          price={data.originalPrice}
          total_sell={data.sold_out}
          fontSize={"2rem"}
        />
        <Countdown startDate={data.startDate} endDate={data.endDate} />
        <FlexDiv
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <FlexDiv>
            <FancyButton>
              <Link to={`/events/${data._id}`}>See Details</Link>
            </FancyButton>
            <FancyButton onClick={addToCartHandler}>Buy Now</FancyButton>
          </FlexDiv>
          <Link to="/events" style={{ fontWeight: "bold" }}>
            See More Events -&gt;
          </Link>
        </FlexDiv>
      </div>
    </Container>
  );
};

export default EventCard;
