import App from "../App";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ActivationPage from "../pages/ActivationPage";
import HomePage from "../pages/HomePage";
import Error from "../pages/ErrorPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import BestSellingPage from "../pages/BestSellingPage";
import EventsPage from "../pages/EventsPage";
import FAQPage from "../pages/FAQPage";
import ProfilePage from "../pages/ProfilePage";
import CheckoutPage from "../pages/CheckoutPage";
import ProtectedUserRoute from "./ProtectedUserRoute";
import ProtectedShopRoute from "./ProtectedShopRoute";
import ShopCreatePage from "../pages/ShopCreatePage";
import ShopLoginPage from "../pages/ShopLoginPage";
import ShopActivationPage from "../pages/ShopActivationPage";
import ShopDashboardPage from "../pages/ShopDashboardPage";
import ShopHomePage from "../pages/ShopHomePage";
import ShopCreateProduct from "../components/Shop/CreateProduct";
import AllProducts from "../components/Shop/AllProducts";
import CreateEvent from "../components/Shop/CreateEvent";
import AllEvents from "../components/Shop/AllEvents";
import AllCoupons from "../components/Shop/AllCoupons";

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
      {
        path: "shops/activation/:activationToken",
        element: <ShopActivationPage />,
      },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },
      { path: "best-selling", element: <BestSellingPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "faq", element: <FAQPage /> },
      {
        path: "profile",
        element: (
          <ProtectedUserRoute>
            <ProfilePage />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedUserRoute>
            <CheckoutPage />
          </ProtectedUserRoute>
        ),
      },
      { path: "shop-create", element: <ShopCreatePage /> },
      { path: "shop-login", element: <ShopLoginPage /> },
      {
        path: "shop/:shop_id",
        element: <ShopHomePage />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedShopRoute>
            <ShopDashboardPage />
          </ProtectedShopRoute>
        ),
        children: [
          { index: true, element: <h1>TODO</h1> },
          { path: "all-orders", element: <h1>TODO</h1> },
          { path: "all-products", element: <AllProducts /> },
          { path: "create-product", element: <ShopCreateProduct /> },
          { path: "all-events", element: <AllEvents /> },
          { path: "create-event", element: <CreateEvent /> },
          { path: "withdraw", element: <h1>TODO</h1> },
          { path: "inbox", element: <h1>TODO</h1> },
          { path: "coupons", element: <AllCoupons /> },
          { path: "refunds", element: <h1>TODO</h1> },
          { path: "settings", element: <h1>TODO</h1> },
        ],
      },
    ],
  },
];

export default routes;
