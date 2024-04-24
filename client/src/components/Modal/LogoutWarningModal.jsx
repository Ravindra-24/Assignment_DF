import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Modal from "./indexModal";
import logoutImg from "../../assets/logoutImg.png";
import { ModalContext } from "../../context/ModalContext";

const LogoutWarningModal = () => {
  const { logoutWarningModal, toggleLogoutWarningModal } = useContext(
    ModalContext
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductDelete = () => {
    try {
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      toggleLogoutWarningModal();
      navigate("/login");
    }
  };

  return (
    <>
      <Modal setOpen={toggleLogoutWarningModal} open={logoutWarningModal}>
        <div className=" ">
          <div className="  bg-[#FFFFFF] shadow-md rounded-lg p-4 w-80 ">
            <h2 className="text-xl font-bold mb-4 text-gray-900 ">
              <span className="flex w-full justify-center items-center">
                <img src={logoutImg} alt="" width={25} height={15} className="mr-2"/>
                <p>Log Out</p>
              </span>
            </h2>
            <p className=" text-gray-900 mb-4">
              Are you sure you want to Log out?
            </p>
            <div className="flex justify-end">
            <button
                onClick={toggleLogoutWarningModal}
                className="text-black py-1 px-2 rounded-2xl border-2 border-[#662671] font-normal mr-1 hover:bg-[#662671] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleProductDelete}
                className="bg-[#662671] hover:bg-red-600  text-white px-2 rounded-2xl font-normal mr-1"
              >
                Confirm
              </button>
              
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutWarningModal;
