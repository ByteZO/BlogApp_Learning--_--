import React from "react";
import Authentication from "../../Authentication/Authentication";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../Store/AuthSlice";
import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import Input from "../Input/Input";
import LogInBtn from "../Buttons/LogInBtn";

export const LogInForm = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [Error, setError] = useState("");

  const handleLogIn = async (data) => {
    setError("");
    try {
      const session = await Authentication.logIn(data);
      if (session) {
        const useData = Authentication.getCurrentUser();
        useData ? Dispatch(logIn(useData)) : null;
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>
            <Logo />
          </span>
        </div>
        <h2> Sign In to your account</h2>
        <p>
          Don't Have An Account
          <Link to="/signUp">Sign Up</Link>
        </p>
        {Error && <p>{Error}</p>}
        <form onSubmit={handleSubmit(handleLogIn)}>
          <div>
            <Input
              label="Email: "
              placeholder=" Enter Your Email "
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Email must me a  Valide Email Address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Password "
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <LogInBtn type="Submit"> Log IN</LogInBtn>
          </div>
        </form>
      </div>
    </div>
  );
};
