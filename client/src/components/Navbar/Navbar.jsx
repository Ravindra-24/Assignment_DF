import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { getCategorieList } from "../../redux/action/category";

const Navbar = () => {
  const {toggleLogoutWarningModal} = useContext(ModalContext);
  const auth = useSelector((state) => state.authReducer);

  return (
    <nav
      style={{
        background: "#662671",
      }}
      className="bg-white-800 shadow-md w-full fixed z-10 top-0"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="inset-y-0 left-0 flex items-center">
          <h2 className="text-white"><span className="text-white font-bold">Digital</span>Flake</h2>
          </div>
          <div className="flex w-2/3 items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
           
          </div>

          <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              {auth.loaded && auth.token && (
                <div className="flex center items-center">
                  <div>
                    <button
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <span className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {auth.user.firstName.charAt(0).toUpperCase()}
                        </span>
                      </span>
                    </button>
                  </div>
                  <svg
                  onClick={toggleLogoutWarningModal}
                  className="ml-4 hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                      stroke="#ffffff"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
