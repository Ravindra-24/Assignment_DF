import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Modal from "./indexModal";
import { updateCategoryItem } from "../../redux/action/category";

const UpdateCategaryModal = ({
  toggleUpdateCategaryModal,
  updateCategaryModal,
  updateItem,
  setUpdateItem,
}) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [categaryName, setCategaryName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
  
    const dispatch = useDispatch();

  const handleCategaryUpdate = () => {
    try {
      setLoading(true);
      dispatch(updateCategoryItem({
        categaryId: updateItem._id,
        categaryName,
        description,
        selectedOption,
      },setLoading, toggleUpdateCategaryModal));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateItem("");
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <Modal setOpen={toggleUpdateCategaryModal} open={updateCategaryModal}>
        <div className=" ">
          <div className="  bg-[#FFFFFF] shadow-md rounded-lg p-4 w-80 ">
            <h2 className="text-xl font-bold mb-4 text-gray-900 ">
              <span className="flex w-full justify-center items-center">
                <p>Update Category</p>
              </span>
            </h2>
            <div className="mb-4">
              <label htmlFor="categoryName" className="text-gray-900">
                Category Name
              </label>
              <input
              onChange={(e) => setCategaryName(e.target.value)}
              value={ categaryName ||updateItem.name}
                type="text"
                id="categoryName"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-gray-900">
                Description
              </label>
              <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={ description ||updateItem.description}
                id="description"
                className="border border-gray-300 rounded-md p-2 w-full"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="text-gray-900">
                Status
              </label>
              <select
              onChange={handleChange}
              value={selectedOption || updateItem.status}
                id="status"
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="w-full flex justify-end">
            <button
            disabled={loading}
                className="text-black hover:bg-white px-2 rounded-2xl font-normal mr-1"
                onClick={toggleUpdateCategaryModal}
              >
                Cancel
              </button>
              <button
                onClick={handleCategaryUpdate}
               className="bg-[#662671] hover:bg-purple-600 text-sm p-2 text-white px-2 rounded-2xl font-normal mr-1">
                {
                  loading ? (<>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-2 text-white animate-spin"
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
                  </svg> Update
                  </>):<>
                  Update
                  </>
                }
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UpdateCategaryModal;
