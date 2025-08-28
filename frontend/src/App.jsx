import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/user";
import { loadShop } from "./redux/actions/shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Layout/Footer/Footer";
import axios from "axios";
import { SERVER_URL } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/payments/stripe_api_key`
        );
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.log(error);
      }
    };

    dispatch(loadUser());
    dispatch(loadShop());
    getStripeApiKey();
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {stripeApiKey ? (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Outlet />
        </Elements>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
}

export default App;
