import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { driversRoute } from "src/screens/drivers";
import { NavigationRoute } from "src/shared/config/navigation";

const RootStack = createNativeStackNavigator({
  initialRouteName: NavigationRoute.DRIVERS,
  screens: {
    [NavigationRoute.DRIVERS]: driversRoute,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export const NavigationProvider = createStaticNavigation(RootStack);
