import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/action/auth";
import withPublic from "../../../hoc/withPublic";
import login_Bg from "../../../assets/loginBg.png";
import login_logo from "../../../assets/Login_logo.png";
import { ModalContext } from "../../../context/ModalContext";

const Login = ({ setProgress }) => {
  const { toggleForgotPassModal } = useContext(ModalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!email || !password) return alert("Please fill all the fields");
      dispatch(loginUser({ email, password }, navigate, setProgress));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img src={login_Bg} alt="bg" className="absolute -z-50 " />
      {/* <img src={login_Bg} alt="bg" className="absolute"/> */}
      <section className="">
        <div className="flex flex-col justify-center px-5 py-7 mx-auto md:h-screen">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#FFFFFF]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center items-center">
              <img className="w-24 h-14 mr-2" src={login_logo} alt="logo" />
              <h1 className="text-xl text-[#717070] leading-tight tracking-tight  md:text-2x">
                Welcome to DigitalFlake Admin
              </h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col space-y-4 sm:space-y-5"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-normal text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-normal text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required={true}
                  />
                </div>
                <div className="w-full flex items-center justify-end">
                  <button
                    onClick={toggleForgotPassModal}
                    type="button"
                    className="text-sm font-medium text-[#A08CB1] hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  style={{
                    background: "#5C218B",
                  }}
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? (
                    <>
                      {" "}
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Login...
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>
              <p className="text-center text-gray-400 font-normal">
                don't have an account
                <Link
                  to={"/signup"}
                  className="ml-1 text-blue-500 hover:text-blue-700 underline"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withPublic(Login);
