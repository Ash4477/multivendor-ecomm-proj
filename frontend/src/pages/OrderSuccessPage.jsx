import Header from "../components/Layout/Header/Header";
import Lottie from "react-lottie";
import animationData from "../assets/animations/order-completed.json";

const OrderSuccessPage = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Lottie options={defaultOptions} width={300} height={300} />
        <h1 style={{}}>Your order is successful 😍</h1>
        <br />
        <br />
      </div>
    </>
  );
};

export default OrderSuccessPage;
