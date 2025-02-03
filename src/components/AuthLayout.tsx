import React, { useState, useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";

interface ProtectedProps {
  children: ReactNode;
  authentication?: boolean;
}

const Protected: React.FC<ProtectedProps> = ({ children, authentication = true }) => {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? null : <>{children}</>;
};

export default Protected;
