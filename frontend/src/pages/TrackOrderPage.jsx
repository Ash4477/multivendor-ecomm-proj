import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../redux/actions/order";
import Header from "../components/Layout/Header/Header";
import TrackOrder from "../components/TrackOrder/TrackOrder";
import Loader from "../components/Layout/Loader/Loader";

const TrackOrderPage = () => {
  const { userOrders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserOrders(user._id));
    }
  }, [dispatch, user]);

  const data = userOrders && userOrders.find((order) => order._id === id);

  if (!data) return <Loader />;
  return (
    <>
      <Header />
      <TrackOrder currentStatus={data?.status} />
    </>
  );
};

export default TrackOrderPage;
