import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getCategorieList } from "../../redux/action/category";
import SpinningBubble from "../../components/Loader/SpinningBubble";
import { CreateProductItem } from "../../redux/action/product";

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productImg, setProductImg] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [packSize, setPackSize] = useState("");
  const [mrp, setMRP] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryItems = useSelector(
    (state) => state.CategaryReducer.categaries
  );
  const activeCategory = categoryItems.filter(
    (item) => item.status === "active"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onload = () => {
      setImagePreview(filereader.result);
      setProductImg(file);
    };
    filereader.readAsDataURL(file);
  };

  const handleProductSubmit = (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (
        !selectedCategory ||
        !productName ||
        !productImg ||
        !packSize ||
        !mrp ||
        !status
      )
        throw new Error("Please fill all the fields");
      const formData = new FormData();
      formData.append("productImg", productImg);
      formData.append("selectedCategary", selectedCategory);
      formData.append("productName", productName);
      formData.append("packSize", packSize);
      formData.append("mrp", mrp);
      dispatch(CreateProductItem(formData, setLoading));
      navigate("/product");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getCategorieList());
  }, []);

  return (
    <>
      {loading && <SpinningBubble />}
      <div className="ml-64 pt-20 pr-4">
        <span className="cursor-pointer" onClick={() => navigate("/product")}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Product List
        </span>

        <form onSubmit={handleProductSubmit}>
          <div className="flex flex-col gap-6 mt-10 md:flex-row md:justify-between">
            <div className="w-full">
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-0 transition-all border border-gray-200 focus:border-gray-900 px-3 py-2.5 rounded-[7px]"
              >
                <option value="">Choose Category</option>
                {activeCategory.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <input
                onChange={(e) => setProductName(e.target.value)}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-0 transition-all border border-gray-200 focus:border-gray-900 px-3 py-2.5 rounded-[7px]"
                placeholder="Product Name"
              />
            </div>
            <div className="w-full">
              <input
                onChange={(e) => setPackSize(e.target.value)}
                className="peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline-0 transition-all border border-gray-200 focus:border-gray-900 px-3 py-2.5 rounded-[7px]"
                placeholder="Pack Size"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-6 md:flex-row md:justify-between">
            <div className="w-full">
              <input
              type="number"
                onChange={(e) => setMRP(e.target.value)}
                className="peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline-0 transition-all border border-gray-200 focus:border-gray-900 px-3 py-2.5 rounded-[7px]"
                placeholder="MRP"
              />
            </div>
            <div className="w-full">
              <input
                onChange={handleImgUpload}
                type="file"
                accept="image/*"
                name="productImg"
                id="productImg"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-0 transition-all border border-gray-200 focus:border-gray-900 px-3 py-2.5 rounded-[7px]"
                placeholder="img"
              />
            </div>
            <div className="w-full">
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-0 transition-all border border-gray-200 focus:border-gray-900 px-3 py-2.5 rounded-[7px]"
              >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          {imagePreview && (
            <div className="mt-6 ">
              <label htmlFor="productImg" className="text-sm text-gray-500">
                Product Image Preview:
              </label>
              <img
                src={imagePreview}
                alt="product"
                className="w-20 h-20 object-cover mt-5"
              />
            </div>
          )}

          <div className="fixed right-[5%] bottom-[5%]">
            <button
              onClick={() => navigate("/product")}
              type="button"
              className="rounded-2xl text-black hover:bg-red-600 hover:text-white font-medium text-sm px-4 py-2.5 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#662671] hover:bg-purple-800 rounded-2xl text-white font-medium text-sm px-4 py-2.5"
            >
              {
                loading ? (<>
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
                  Submit
                </>
                ):(
                  <>Submit</>
                )
              }
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
