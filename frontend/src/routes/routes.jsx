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
import EventDetailsPage from "../pages/EventDetailsPage";
import FAQPage from "../pages/FAQPage";
import ProfilePage from "../pages/ProfilePage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";
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
import Refunds from "../components/Shop/Refunds";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import AllOrders from "../components/Shop/AllOrders";
import ShopOrderDetailsPage from "../pages/ShopOrderDetailsPage";
import UserOrderDetailsPage from "../pages/UserOrderDetailsPage";
import RefundDetailsPage from "../pages/RefundDetailsPage";
import TrackOrderPage from "../pages/TrackOrderPage";
import Dashboard from "../components/Shop/Dashboard";
import ShopSettingsPage from "../pages/ShopSettingsPage";
import Withdraw from "../components/Shop/Withdraw";
import Inbox from "../components/Shop/Inbox/Inbox";
import UserInboxPage from "../pages/UserInboxPage";
import UserChat from "../components/UserInbox/UserChat";
import UserInbox from "../components/UserInbox/UserInbox";

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
      { path: "events/:id", element: <EventDetailsPage /> },
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
      {
        path: "payment",
        element: (
          <ProtectedUserRoute>
            <PaymentPage />
          </ProtectedUserRoute>
        ),
      },
      { path: "order-success", element: <OrderSuccessPage /> },
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
          { index: true, element: <Dashboard /> },
          { path: "all-orders", element: <AllOrders /> },
          { path: "all-products", element: <AllProducts /> },
          { path: "create-product", element: <ShopCreateProduct /> },
          { path: "all-events", element: <AllEvents /> },
          { path: "create-event", element: <CreateEvent /> },
          { path: "withdraw", element: <Withdraw /> },
          { path: "inbox", element: <Inbox /> },
          { path: "coupons", element: <AllCoupons /> },
          { path: "refunds", element: <Refunds /> },
        ],
      },
      {
        path: "shop/refund/:id",
        element: (
          <ProtectedUserRoute>
            <RefundDetailsPage />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "shop/order/:id",
        element: (
          <ProtectedShopRoute>
            <ShopOrderDetailsPage />
          </ProtectedShopRoute>
        ),
      },
      {
        path: "user/order/:id",
        element: (
          <ProtectedUserRoute>
            <UserOrderDetailsPage />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "user/track/order/:id",
        element: (
          <ProtectedUserRoute>
            <TrackOrderPage />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedShopRoute>
            <ShopSettingsPage />
          </ProtectedShopRoute>
        ),
      },
      {
        path: "user/inbox",
        element: (
          <ProtectedUserRoute>
            <UserInboxPage />
          </ProtectedUserRoute>
        ),
        children: [
          {
            index: true,
            element: <UserInbox />,
          },
          {
            path: ":id",
            element: <UserChat />,
          },
        ],
      },
    ],
  },
];

export default routes;
