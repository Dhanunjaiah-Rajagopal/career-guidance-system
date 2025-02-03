import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import Login from "./pages/Login";
import Protected from "./components/AuthLayout";
import Signup from "./pages/Signup";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./components/theme-provider";
import ProfilePage from "./pages/Profile";
import CareerPreference from "./pages/CareerPreference";
import QuizPage from "./pages/QuizPage";
import QuizResultspage from "./pages/QuizResultsPage";
import GuidelinesPage from "./pages/GuidelinesPage";
import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected authentication>
            <ProfilePage />
          </Protected>
        ),
      },
      {
        path: "/CareerPreference",
        element: (
          <Protected authentication>
            <CareerPreference />
          </Protected>
        ),
      },
      {
        path: "/quiz",
        element: (
          <Protected authentication>
            <QuizPage />
          </Protected>
        ),
      },
      {
        path: "/quiz-results",
        element: (
          <Protected authentication>
            <QuizResultspage />
          </Protected>
        ),
      },
      {
        path: "/career-guidelines",
        element: (
          <Protected authentication>
            <GuidelinesPage />
          </Protected>
        ),
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>
);
