import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { imageUpload } from "../../Api/Utils";
import toast from "react-hot-toast";

const SignUp = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, setLoading } = useContext(AuthContext);
    const [imageName, setImageName] = useState("Profile Photo");

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];
        console.log(image);

        try {
            setLoading(true);
            const image_url = await imageUpload(image);
            console.log(image_url);
            setImageName(image.name);

            const result = await createUser(email, password);
            console.log(result);

            await updateUserProfile(name, image_url);
            navigate('/');
            toast.success('Signup Successful');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImage = e => {
        setImageName(e.target.files[0].name)
    }


  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center flex-col justify-center min-h-screen px-6 mx-auto">
          <form onSubmit={handleSignUp} className="w-full max-w-md">
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
                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                Sign Up
              </NavLink>
              <NavLink
               to='/login'
                className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
              >
                Login
              </NavLink>
            </div>

            <div className="relative flex items-center mt-8">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                type="text"
                name="name"
                required
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
              />
            </div>

            <label
              htmlFor="image"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>

              <h2 className="mx-3 text-gray-400">{imageName}</h2>

              <input onChange={(e) => setImageName(e.target.files[0].name)} required id="image" type="file" name="image" accept="image/*" className="hidden" />
            </label>

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
                required
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
                required
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign Up
              </button>

              <div className="mt-6 text-center">
                <Link to='/login'
                  className="text-sm text-green-500 hover:underline dark:text-green-300"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
      <div>
      </div>
    </div>
  );
};

export default SignUp;
