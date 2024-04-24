import toast from "react-hot-toast";
import * as api from "../api";

export const GetProductItems = () => async (dispatch) => {
    try {
        const response = await api.getProductData();
        dispatch({ type: "GET_PRODUCT_ITEMS", payload: response.data });
    } catch (error) {
        console.log(error);
    }
};

export const CreateProductItem = (formData, setLoading) => async (dispatch) => {
    try {
        const response = await api.createProduct(formData);
        dispatch(GetProductItems());
        toast.success(response.data.message);
    } catch (error) {
        console.log(error);
    }finally{
        setLoading(false);
    }
}

export const updateProductItem = (productData, setLoading, toggleUpdateProductModal) => async (dispatch) => {
    try {
        const response = await api.updateProduct(productData);
        dispatch(GetProductItems());
        toast.success(response.message);
    } catch (error) {
        console.log(error);
    }finally{
        toggleUpdateProductModal();
        setLoading(false);
    }
}

export const deleteProductItem = (productId, setLoading) => async (dispatch) => {
    try {
        const response = await api.deleteProduct(productId);
        dispatch(GetProductItems());
        toast.success(response.message);
    } catch (error) {
        console.log(error);
    }finally{
        setLoading(false);
    }
}

export const searchProductData = ( string, setLoading) => async (dispatch) => {
    try {
        const response = await api.searchString(string);
        dispatch({ type: "SEARCH_PRODUCT_ITEMS", payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }finally{ 
        setLoading(false);
    }
}