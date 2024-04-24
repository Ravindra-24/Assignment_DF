import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [logoutWarningModal, setLogoutWarningModal] = useState(false);
  const [updateCategaryModal, setUpdateCategaryModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false)
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);

  const user = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    if (user === null) {
      setShowDeleteModal(false);
      setLogoutWarningModal(false);
      setUpdateCategaryModal(false);
      setUpdateProductModal(false)
    }
  }, [user]);

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const toggleLogoutWarningModal = () => {
    setLogoutWarningModal(!logoutWarningModal);
  }

  const toggleUpdateCategaryModal = () => {
    setUpdateCategaryModal(!updateCategaryModal);
  
  }

  const toggleUpdateProductModal = () => {
    setUpdateProductModal(!updateProductModal)
  }

  const toggleForgotPassModal = () => {
    setShowForgotPassModal(!showForgotPassModal);
  }


  return (
    <ModalContext.Provider
      value={{
        showDeleteModal,
        logoutWarningModal,
        updateCategaryModal,
        updateProductModal,
        showForgotPassModal,
        toggleForgotPassModal,
        toggleUpdateProductModal,
        toggleUpdateCategaryModal,
        toggleLogoutWarningModal,
        toggleDeleteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};