import App from "./App";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import HomePage from "./pages/HomePage";
import Error from "./pages/ErrorPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BestSellingPage from "./pages/BestSellingPage";
import EventsPage from "./pages/EventsPage";
import FAQPage from "./pages/FAQPage";
import ProfilePage from "./pages/ProfilePage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignupPage /> },
      { path: "activation/:activationToken", element: <ActivationPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:name", element: <ProductDetailsPage /> },
      { path: "best-selling", element: <BestSellingPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "faq", element: <FAQPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
];

export default routes;
