import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slice/globalSlice";
import { adminApi } from "./api/adminApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
    reducer: {
        [globalSlice.name]: globalSlice.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(adminApi.middleware),
});
setupListeners(store.dispatch);

export default store;
