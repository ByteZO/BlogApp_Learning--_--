import React, { Children } from "react";
import { useDispatch } from "react-redux";
import Authentication from "../../Authentication/Authentication";
import { logOut } from "../../Store/AuthSlice";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    Authentication.logOut().then(() => dispatch(logOut()));
  };
  return (
    <button
      className={`inline-block  px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${
        (className, bgColor, textColor)
      }`}
      onClick={logOutHandler}
      typeof={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
