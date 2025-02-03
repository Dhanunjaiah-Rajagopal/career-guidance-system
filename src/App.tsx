import { useState, useEffect } from "react";
import {  useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import authService from "./appwrite/auth";
import Footer from "./components/Footer/Footer";
import ChatAssistant from "./components/chatAssistant";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          if (location.pathname === "/login") {
            navigate("/profile");
          }
        } else {
          dispatch(logout());
          if (location.pathname === "/profile") {
            navigate("/login");
          }
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate, location]);


  return !loading ? (
    <div > 
        <div className="w-full ">
          <Header />
        </div>

      <main className="flex-grow">
            <Outlet />
            <ChatAssistant />
      </main>
        <div>
          <Footer />
        </div>
    </div>
  ) : null;
};

export default App;
