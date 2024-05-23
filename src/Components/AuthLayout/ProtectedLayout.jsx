import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.stauts);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/logIn");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <> {children} </>;
};

export default ProtectedLayout;
