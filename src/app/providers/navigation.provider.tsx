import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { driverRacesRoute } from "src/screens/driver-races";
import { driverRoute } from "src/screens/driver";
import { driversRoute } from "src/screens/drivers";
import { NavigationRoute } from "src/shared/config/navigation";

const RootStack = createNativeStackNavigator({
  initialRouteName: NavigationRoute.DRIVERS,
  screens: {
    [NavigationRoute.DRIVERS]: driversRoute,
    [NavigationRoute.DRIVER]: driverRoute,
    [NavigationRoute.DRIVER_RACES]: driverRacesRoute,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export const NavigationProvider = createStaticNavigation(RootStack);
