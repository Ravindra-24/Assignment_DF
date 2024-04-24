import React, { useContext, useState } from "react";
import Modal from "../../components/Modal/indexModal"; // A generic modal component
import { useDispatch } from "react-redux";
import SpinningBubble from "../../components/Loader/SpinningBubble"; // Optional loading indicator
import { ModalContext } from "../../context/ModalContext";

function ForgotPasswordModal() {
  const { showForgotPassModal, toggleForgotPassModal } = useContext(
    ModalContext
  );
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // await dispatch(forgotPassword(email));
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={showForgotPassModal} setOpen={toggleForgotPassModal}>
      <div className="p-10 bg-[#FFFFFf] rounded-md flex-col flex justify-center items-center">
        <h2 className="text-lg font-bold mb-4 text-[#662671]">
          Did you forget your password?
        </h2>
        <p className="text-sm font-normal mb-4 text-[#655A5A]">
          Enter your email address and we'll send you a link to restore password
        </p>
        {loading ? (
          <SpinningBubble />
        ) : success ? (
          <div className="text-green-600">
            Check your email for a reset link.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="w-full p-10">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 p-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  onClick={handleEmailChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
              {error && <div className="text-red-600 mb-4">{error}</div>}
              <div>
                <button
                  type="submit"
                  className="bg-[#5C218B] w-full text-white font-normal px-4 py-2 rounded-md mt-2"
                  disabled={loading}
                >
                  request reset link
                </button>
              </div>
            </form>
            <button
              className=" text-purple-300 underline"
              onClick={toggleForgotPassModal}
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

export default ForgotPasswordModal;
