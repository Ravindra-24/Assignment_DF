const initialState = {
    searchedCategaries: [],
    loaded: false,
  };
  
  const searchCategaryReducer = (state = initialState, action) => {
    const { payload, type } = action;
        switch (type) {
            case "SEARCH_CATEGORY_DATA":
                return { ...state, searchedCategaries: [...payload], loaded: true };
            default:
                return state;
        }
    };
    
    export default searchCategaryReducer;