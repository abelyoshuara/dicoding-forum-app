import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterRequest } from "../interfaces/requests";

interface RegisterInputProps {
  onRegister: (values: RegisterRequest) => void;
  isLoading: boolean;
}

function RegisterInput({ onRegister, isLoading }: RegisterInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => onRegister(data);

  return (
    <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <div className="form-control">
          <input
            placeholder="Name"
            type="text"
            className={`input max-w-full ${errors.name && "input-error"}`}
            id="name"
            autoComplete="name"
            {...register("name", {
              required: "This field is required",
            })}
          />
        </div>
        {errors.name && (
          <label htmlFor="name" className="form-label">
            <span className="form-label-alt text-error" data-testid="errName">
              {errors.name?.message}
            </span>
          </label>
        )}
      </div>

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
              minLength: {
                value: 4,
                message: "This field must be at least 4 digits",
              },
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
            Register
          </button>
        </div>
      </div>

      <div className="form-field">
        <div className="form-control justify-center">
          <Link
            to={"/login"}
            className="link link-primary link-underline-hover text-sm"
          >
            Already have an account? Login.
          </Link>
        </div>
      </div>
    </form>
  );
}

export default RegisterInput;
