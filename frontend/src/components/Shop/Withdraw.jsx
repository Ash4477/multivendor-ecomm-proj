import styled from "styled-components";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopOrders } from "../../redux/actions/order";
import { FancyButton } from "../../styled-comps/commonComps";

const Container = styled.div`
  padding: 2rem 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Withdraw = () => {
  const { shop } = useSelector((state) => state.shop);
  const { shopOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shop?._id) {
      dispatch(getShopOrders(shop._id));
    }
  }, [shop, dispatch]);

  const totalBalance = useMemo(() => {
    let totalAmount = 0;
    shopOrders.forEach((order) => {
      if (order.status === "Delivered") {
        totalAmount += order.totalPrice;
      }
    });
    const serviceCharge = totalAmount * 0.1;
    const balance = (totalAmount - serviceCharge).toFixed(2);
    return balance;
  }, [shopOrders]);

  return (
    <Container>
      <p>Available Balance: ${totalBalance}</p>
      <FancyButton $bRad="5px" $pad="0.5rem 2rem">
        Withdraw
      </FancyButton>
    </Container>
  );
};

export default Withdraw;
