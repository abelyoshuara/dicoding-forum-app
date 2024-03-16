import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import RegisterInput from "../components/RegisterInput";
import { useRegisterMutation } from "../services/userService";
import { RegisterRequest } from "../interfaces/requests";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = ({ name, email, password }: RegisterRequest) => {
    const myRegister = register({ name, email, password }).unwrap();
    toast.promise(myRegister, {
      loading: "Registering...",
      success: ({ data }) => {
        navigate("/login");
        return `Successfully registerd ${data.user.email}`;
      },
      error: (err) => `${err.message}`,
    });
    // try {
    //   const resultAction = await register({ name, email, password }).unwrap();
    //   toast.success((resultAction as { message: string }).message);
    //   navigate("/login");
    // } catch (error) {
    //   toast.error((error as { message: string }).message);
    // }
  };

  return (
    <AuthLayout title="Register Page">
      <section id="register" className="w-full max-w-lg rounded-lg">
        <div className="container">
          <div className="card max-w-full">
            <div className="card-body">
              <div className="mb-4 flex flex-col items-center">
                <h1 className="mb-1 text-3xl font-semibold">Register</h1>
                <p className="text-sm">Register to access your account</p>
              </div>
              <RegisterInput
                onRegister={handleRegister}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}

export default RegisterPage;
