import React,{ useEffect, useState } from "react";
import withPrivate from "../../hoc/withPrivate";
import CategoryImg from "../../assets/categoryimg.png";
import { Link } from "react-router-dom";
import CategoryTable from "./CategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategorieList, searchCategaryData } from "../../redux/action/category";
const Category = () => {
  const auth = useSelector((state) => state.authReducer);
  const [string, setString] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fetchData = () => {
    // if(string.length === 0) return;
    setLoading(true);
    dispatch(searchCategaryData(string, setLoading));
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData()
    }, 400);
    return () => clearTimeout(timeout);
  }, [string]);
  useEffect(() => {
    if(auth.loaded && auth.token) {
      dispatch(getCategorieList());
    }
  }, [dispatch, auth]);
  
  return (
    <>
      <div className="ml-64 pt-20 pr-4">
        <div className=" h-screen">
          <span className="h-[12vh]"></span>
          <div className="w-full  flex justify-evenly items-center">
            <span className="flex">
              <img
                src={CategoryImg}
                alt="img"
                width={20}
                height={20}
                className="mr-2"
              />
              <p>Category</p>
            </span>
            <div>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                onChange={(e) => setString(e.target.value)}
                  type="text"
                  id="search"
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                  placeholder="Search Category name..."
                  required
                />
              </div>
            </div>
            <Link to="/add-category">
              <button className="bg-[#662671] hover:bg-purple-600 p-2 text-sm text-white px-2 rounded-2xl font-normal">
                Add Category
              </button>
            </Link>
          </div>
          <div className="mt-10">
          <CategoryTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default withPrivate(Category);
