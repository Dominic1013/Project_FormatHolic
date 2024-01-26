import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSliceReducer from "./slices/user.slice";

//新增 redux-persist
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userSliceReducer });

//存入localStorage，讓state保存
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // for something can't turn to json
    }),
});

export const persistor = persistStore(store);

//---------------------------------------------
// const store = configureStore({
//   reducer: {
//     user: userSliceReducer,
//   },
// });

// export default store;
