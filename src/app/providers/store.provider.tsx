import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "src/shared/lib/redux";
import { Provider } from "react-redux";

export const extraArgument = {};

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export const StoreProvider = ({ children }: React.PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
