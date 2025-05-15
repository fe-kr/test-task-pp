import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoute } from "src/shared/config/navigation";

const RootStack = createNativeStackNavigator({
  initialRouteName: NavigationRoute.DRIVERS,
  screens: {
    [NavigationRoute.DRIVERS]: () => null,
  },
});

export const NavigationProvider = createStaticNavigation(RootStack);
