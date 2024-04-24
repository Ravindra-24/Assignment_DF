const initialState = {
    product: [],
    searchedProduct: [],
    loaded: false,
  };
  
  const ProductReducer = (state = initialState, action) => {
    const { payload, type } = action;
        switch (type) {
            case "GET_PRODUCT_ITEMS":
                return { ...state, product: [...payload], loaded: true };
            case "SEARCH_PRODUCT_ITEMS":
                return { ...state, searchedProduct: [...payload], loaded: true };
            default:
                return state;
        }
    };
    
    export default ProductReducer;