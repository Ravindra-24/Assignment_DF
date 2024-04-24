
const initialState = {
    categaries: [],
    searchedCategaries: [],
    loaded: false,
  };
  
  const CategoryReducer = (state = initialState, action) => {
    const { payload, type } = action;
        switch (type) {
            case "CATEGORY_DATA":
                return { ...state, categaries: [...payload], loaded: true };
            case "SEARCH_CATEGORY_DATA":
                return { ...state, searchedCategaries: [...payload], loaded: true };
            default:
                return state;
        }
    };
    
    export default CategoryReducer;
  