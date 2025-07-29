import App from "./App";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import HomePage from "./pages/HomePage";
import Error from "./pages/ErrorPage";

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
    ],
  },
];

export default routes;
