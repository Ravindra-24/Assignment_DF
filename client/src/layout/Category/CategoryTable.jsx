import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import withPrivate from "../../hoc/withPrivate";
import SpinningBubble from "../../components/Loader/SpinningBubble";
import { ModalContext } from "../../context/ModalContext";
import DeleteModal from "../../components/Modal/DeleteModal";
import UpdateCategaryModal from "../../components/Modal/UpdateCategaryModal";
import { deleteCategoryItem } from "../../redux/action/category";
import Table from "./Table";

function CategoryTable() {
  const categaryData = useSelector((state) => state.CategaryReducer);
  const searchedCategaries = useSelector((state) => state.searchCategaryReducer.searchedCategaries);
  const {
    showDeleteModal,
    updateCategaryModal,
    toggleDeleteModal,
    toggleUpdateCategaryModal,
  } = useContext(ModalContext);
  const [id, setId] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const handleDeleteCard = (id) => {
    setId(id);
    toggleDeleteModal();
  };

  const handleEditClick = (item) => {
    setUpdateItem(item);
    toggleUpdateCategaryModal();
  };

  const checkStatus = (status) => {
    return status === "active" ? false : true;
  };
// const CategaryList = searchedCategaries ? searchedCategaries : categaryData.categaries;
// console.log(CategaryList);
  return (
    <>
      <DeleteModal
        actionOrigin={deleteCategoryItem}
        toggleDeleteModal={toggleDeleteModal}
        showDeleteModal={showDeleteModal}
        id={id}
        setId={setId}
      />

      <UpdateCategaryModal
        toggleUpdateCategaryModal={toggleUpdateCategaryModal}
        updateCategaryModal={updateCategaryModal}
        updateItem={updateItem}
        setUpdateItem={setId}
      />

      <div className=" overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-[#FFF8B7]">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3 ml-20">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!categaryData.loaded ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="flex items-center justify-center h-full">
                    <div role="status" className="text-center">
                      <SpinningBubble />
                    </div>
                  </div>
                </td>
              </tr>
            ) : categaryData.categaries?.length > 0 ? (
              <>
                { categaryData.categaries?.map((item) => (
                  <Table
                    item={item}
                    handleEditClick={handleEditClick}
                    checkStatus={checkStatus}
                    handleDeleteCard={handleDeleteCard}
                  />
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="4" className="font-bold p-4 text-center">
                  <div>No categories found. Please add some categories </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default withPrivate(CategoryTable);
