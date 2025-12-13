import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Features/authSlice";
import loginReducer from "./Features/LoginSlice";
import allUserReducer from "./Features/AllUser";
import authReducer from "./Features/authSlice";

const store = configureStore({
  reducer: {
     register: registerReducer,
     auth: authReducer,
     login:loginReducer,
     users: allUserReducer,

  },
});

export default store;
