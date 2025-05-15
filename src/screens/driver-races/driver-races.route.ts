import { NavigationRoute } from "src/shared/config/navigation";
import { AppLayout } from "src/widgets/app-layout";
import { DriverRacesScreen } from "./driver-races.ui";

export const driverRacesRoute = {
  name: NavigationRoute.DRIVER_RACES,
  screen: DriverRacesScreen,
  layout: AppLayout,
  options: {
    title: "Driver Races",
  },
};
