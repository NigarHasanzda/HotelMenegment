import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Features/RegisterSlice";
import loginReducer from "./Features/LoginSlice";

const store = configureStore({
  reducer: {
     register: registerReducer,
     login:loginReducer,

  },
});

export default store;
