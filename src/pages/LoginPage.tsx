import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import LoginInput from "../components/LoginInput";
import { useSetAuthUserMutation } from "../services/authService";
import { LoginRequest } from "../interfaces/requests";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [setAuthUser, { isLoading }] = useSetAuthUserMutation();
  const navigate = useNavigate();

  const handleLogin = ({ email, password }: LoginRequest) => {
    const login = setAuthUser({ email, password }).unwrap();
    toast.promise(login, {
      loading: "Logging...",
      success: ({ data }) => {
        navigate("/");
        return `Successfully logged in as ${data.user.email}`;
      },
      error: (err) => err,
    });
  };

  return (
    <AuthLayout title="Login Page">
      <section id="login" className="w-full max-w-lg rounded-lg">
        <div className="container">
          <div className="card max-w-full">
            <div className="card-body">
              <div className="mb-4 flex flex-col items-center">
                <h1 className="mb-1 text-3xl font-semibold">Login</h1>
                <p className="text-sm">Login to access your account</p>
              </div>
              <LoginInput onLogin={handleLogin} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}

export default LoginPage;
