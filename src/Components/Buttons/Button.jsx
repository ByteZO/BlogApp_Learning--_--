import React, { Children } from "react";
import { useDispatch } from "react-redux";
import Authentication from "../../Authentication/Authentication";
import { logOut } from "../../Store/AuthSlice";

const Button = ({children}) => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    Authentication.logOut().then(() => dispatch(logOut()));
  };
  return (
    <div
      className=" inline-block  px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logOutHandler}
    >
      {children}
    </div>
  );
};

export default Button;
