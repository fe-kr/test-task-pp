import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "src/shared/lib/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storagePersistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export const extraArgument = {};

export const store = configureStore({
  reducer: persistReducer(storagePersistConfig, rootReducer),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: { extraArgument },
    }),
});

const persistor = persistStore(store);

export const StoreProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};
