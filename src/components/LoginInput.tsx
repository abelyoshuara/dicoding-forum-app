import { Link } from "react-router-dom";
import { LoginRequest } from "../interfaces/requests";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginInputProps {
  onLogin: (values: LoginRequest) => void;
  isLoading: boolean;
}

function LoginInput({ onLogin, isLoading }: LoginInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit: SubmitHandler<LoginRequest> = (data) => onLogin(data);

  return (
    <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <div className="form-control">
          <input
            placeholder="Email"
            type="email"
            className={`input max-w-full ${errors.email && "input-error"}`}
            id="email"
            autoComplete="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is invalid",
              },
            })}
          />
        </div>
        {errors.email && (
          <label htmlFor="email" className="form-label">
            <span className="form-label-alt text-error" data-testid="errEmail">
              {errors.email?.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="form-control">
          <input
            placeholder="Password"
            type="password"
            className={`input max-w-full ${errors.password && "input-error"}`}
            id="password"
            {...register("password", {
              required: "This field is required",
            })}
          />
        </div>
        {errors.password && (
          <label htmlFor="password" className="form-label">
            <span
              className="form-label-alt text-error"
              data-testid="errPassword"
            >
              {errors.password?.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-field pt-5">
        <div className="form-control justify-between">
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading && "btn-loading"}`}
          >
            Login
          </button>
        </div>
      </div>

      <div className="form-field">
        <div className="form-control justify-center">
          <Link
            to={"/register"}
            className="link link-primary link-underline-hover text-sm"
          >
            Dont have an account yet? Register.
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginInput;
