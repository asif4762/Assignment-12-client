import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { SignIn, signInWithGoogle, loading, resetPassword, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      await SignIn(email, password);
      navigate(from);
      toast.success('Login Successful');
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate(from);
      toast.success('Login Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleResetPassword = async () =>{
    if(!email) return toast.error('Please Wrtie Your Email First')
      try{
    await resetPassword(email)
    toast.success('Password reset link sent');
    setLoading(false)
  }catch(err){
    console.log(err)
    toast.error(err.message)
    setLoading(false)
  }
  console.log(email)
  }

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center flex-col justify-center min-h-screen px-6 mx-auto">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-[100px]"
                src="https://api.logo.com/api/v2/images?logo=logo_12043915-fe7e-4d51-bcaf-46696dc86028&u=1717606049&width=500&height=400&fit=contain&margins=100&format=webp&quality=60"
                alt="Logo"
              />
            </div>

            <div className="flex items-center justify-center mt-6">
              <NavLink
                to='/signUp'
                className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
              >
                Sign Up
              </NavLink>

              <NavLink
                to='/login'
                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                Login
              </NavLink>
            </div>

            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="email"
                name="email"
                onBlur={e => setEmail(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                name="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
            </div>
            <button type="button" onClick={handleResetPassword} className="mt-4 text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forgot Password?</button>
            <div className="mt-6">
              <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Login
              </button>

              <div className="mt-6 text-center">
                <NavLink
                  to="/signUp"
                  className="text-sm text-green-500 hover:underline dark:text-green-300"
                >
                  Create an account
                </NavLink>
              </div>
            </div>
          </form>
          <button disabled={loading} onClick={handleGoogleLogin} className="bg-green-50 h-[50px] w-[50px] flex items-center justify-center rounded-full mt-2">
            <FaGoogle className="text-3xl text-blue-900" />
          </button>
        </div>
      </section>
      <div>
      </div>
    </div>
  );
};

export default Login;
