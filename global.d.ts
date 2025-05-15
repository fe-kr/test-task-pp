import { type RootStackParamList } from "./src/app/providers";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
