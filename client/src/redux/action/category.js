import toast from "react-hot-toast";
import * as api from "../api";

export const getCategorieList = () => async (dispatch) => {
    try {
        const response = await api.getCategories();
        dispatch({ type: "CATEGORY_DATA", payload: response.data });
    } catch (error) {
        console.log(error);
    }
}

export const createCategoryList = (categoryData, setLoading) => async (dispatch) => {
    try {
        await api.createCategory(categoryData);
            dispatch(getCategorieList())
            toast.success("Category created successfully")
    } catch (error) {
        console.log(error);
        toast.error(error.response.message);
    }finally{
        setLoading(false)
    }
}

export const deleteCategoryItem = (id, setLoading) => async (dispatch) => {
    try {
        const response = await api.deleteCategary(id);
        dispatch(getCategorieList());
        toast.success(response.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }finally{
        setLoading(false)
    }
}

export const updateCategoryItem = ( categoryData, setLoading, toggleUpdateCategaryModal) => async (dispatch) => {
    try {
        const response = await api.updateCategory(categoryData);
        dispatch(getCategorieList());
        toast.success(response.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        
    }finally{
        toggleUpdateCategaryModal()
        setLoading(false)
    }
}

export const searchCategaryData = ( string, setLoading) => async (dispatch) => {
    try {
        const response = await api.searchCategary(string);
        dispatch({ type: "SEARCH_CATEGORY_DATA", payload: response.data });
        
    } catch (error) {
        console.log(error);
    }finally{ 
        setLoading(false);
    }
}