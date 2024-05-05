import React, { useEffect, useState } from "react";
import Authentication from "../../Authentication/Authentication";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../../Store/AuthSlice";


const Header = () => {
  const [Loading, setLoading] = useState(true);
  const Dispatch = useDispatch();
  useEffect(() => {
    Authentication.getCurrentUser()
      .then((useData) => {
        useData ? Dispatch(logIn(useData)) : Dispatch(logOut());
      })
      .finally(() => setLoading(false));
  });
  return !Loading ? (
    <div className=" min-h-screen bg-slate-600"> You are not LogIn !!! </div>
  ) : null;
};

export default Header;
