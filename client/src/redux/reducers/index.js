import { combineReducers } from "redux";

import authReducer from "./authRedducer";
import CategaryReducer from "./CategaryReducer";
import ProductReducer from "./ProductReducer";
import searchCategaryReducer from "./searchCategaryReducer";

const rootReducer =  combineReducers({
    authReducer, CategaryReducer,searchCategaryReducer,ProductReducer
})

export default rootReducer;