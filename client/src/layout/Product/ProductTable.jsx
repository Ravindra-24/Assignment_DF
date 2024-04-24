import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withPrivate from "../../hoc/withPrivate";
import SpinningBubble from "../../components/Loader/SpinningBubble";
import { ModalContext } from "../../context/ModalContext";
import DeleteModal from "../../components/Modal/DeleteModal";
import { GetProductItems, deleteProductItem } from "../../redux/action/product";
import UpdateProductModal from "../../components/Modal/UpdateProductModal";
import Table from "./Table";

function ProductTable() {
  const productData = useSelector((state) => state.ProductReducer);
  const {
    showDeleteModal,
    updateProductModal,
    toggleDeleteModal,
    toggleUpdateProductModal,
  } = useContext(ModalContext);

  const [id, setId] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const handleDeleteCard = (id) => {
    setId(id);
    toggleDeleteModal();
  };

  const handleEditClick = (item) => {
    setUpdateItem(item);
    toggleUpdateProductModal();
  };

  const checkStatus = (status) => {
    return status === "active" ? false : true;
  };

     useEffect(() => {
      if(productData.searchedProduct.length > 0) {
        setProductList(productData.searchedProduct);
      } else {
        setProductList(productData.product);
      }
      // dispatch(GetProductItems());
     }, [productData.product, productData.searchedProduct]);

  return (
    <>
      <DeleteModal
        actionOrigin={deleteProductItem}
        toggleDeleteModal={toggleDeleteModal}
        showDeleteModal={showDeleteModal}
        id={id}
        setId={setId}
      />

      <UpdateProductModal
        toggleUpdateProductModal={toggleUpdateProductModal}
        updateProductModal={updateProductModal}
        updateItem={updateItem}
        setUpdateItem={setId}
      />

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-[#FFF8B7]">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Pack Size</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">MRP</th>
              <th scope="col" className="px-6 py-3 ml-20">Image</th>
              <th scope="col" className="px-6 py-3 ml-20">Status</th>
              <th scope="col" className="px-6 py-3 ml-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!productData.loaded ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <div className="flex items-center justify-center h-full">
                    <div role="status" className="text-center">
                      <SpinningBubble />
                    </div>
                  </div>
                </td>
              </tr>
            ) : productList && productList.length > 0 ? (
              productList.map((item) => (
                <Table
                  key={item._id}
                  item={item}
                  handleEditClick={handleEditClick}
                  checkStatus={checkStatus}
                  handleDeleteCard={handleDeleteCard}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="font-bold p-4 text-center">
                  <div>No products found. Please add some products.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default withPrivate(ProductTable);
