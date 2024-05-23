import React from "react";
import Authentication from "../../Authentication/Authentication";
import { logIn } from "../../Store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Logo from "../Logo/Logo";
import Input from "../Input/Input";
import Button from "../Buttons/Button";

export const SignUpForm = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [Error, setError] = useState("");

  const { register, handelSubmit } = useForm();
  const handelSignUp = async (data) => {
    try {
      setError("");
      const useData = await Authentication.createAccount(data);
      if (useData) {
        const currentUserData = await Authentication.getCurrentUser();
        currentUserData ? Dispatch(logIn(useData)) : null;
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div>
        <div>
          <div>
            <span>
              <Logo />
            </span>
          </div>
          <h2>Sign UP to create an account</h2>
          <p>
            Already have an account ?<Link to="/logIn">Log IN </Link>
          </p>
          {Error && <p>{Error}</p>}

          <form onSubmit={handelSubmit(handelSignUp)}>
            <div>
              <Input
                type="text"
                label="User Name: "
                palceholder="Enter Your User Name "
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                type="text"
                label="Email: "
                palceholder="Email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                        value
                      ) || "Email Must Be A  Valide Email Address",
                  },
                })}
              />
              <Input
                type="password"
                label="Password: "
                palceholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit"> Create Account </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
