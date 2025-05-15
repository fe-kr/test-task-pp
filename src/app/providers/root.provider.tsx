import { NavigationProvider } from "./navigation.provider";
import { StoreProvider } from "./store.provider";

export const RootProvider = () => {
  return (
    <StoreProvider>
      <NavigationProvider />
    </StoreProvider>
  );
};
