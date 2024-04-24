import axios from "axios";
import store from '../../redux/store'
import { toast } from 'react-hot-toast';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
  headers: {},
});

API.interceptors.request.use((req) => {
  const auth = store.getState().authReducer;
  if (auth.token) {
    req.headers.authorization = `Bearer ${auth.token}`;
  }
  return req;
},(error) => {
    console.log(error);
    toast.error(error.response.message);
    return Promise.reject(error)
})

API.interceptors.response.use((response) => {
  if(response) return response.data;
},(error) => { 
  if(error.axiosError){
    toast.error(error.message);
  }
    if(error.response.status===401){
      store.dispatch({type:"LOGOUT"})
    }
    return  Promise.reject(error)
});


export const validate =(token)=>API.get(`/auth/validate/${token}`)

export const signup =(authData)=>API.post("/auth/signup",authData)
export const login =(authData)=>API.post("/auth/login",authData)

export const getCategories =()=>API.get("/categary/get")
export const createCategory =(categoryData)=>API.post("/categary/create",categoryData)
export const updateCategory =(categoryData)=>API.patch("/categary/update",categoryData)
export const deleteCategary =(CategaryId)=>API.delete(`/categary/delete/${CategaryId}`)

export const searchCategary =( string)=>API.get(`/categary/search?_search=${string}`)
export const searchString = ( string)=>API.get(`/product/search?_search=${string}`)

export const getProductData =()=>API.get("/product/get")
export const createProduct =(formData)=>API.post("/product/create",formData)
export const updateProduct =(productData)=>API.patch("/product/update",productData)
export const deleteProduct =(productId)=>API.delete(`/product/delete/${productId}`)