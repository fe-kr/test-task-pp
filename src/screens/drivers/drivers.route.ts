import { NavigationRoute } from "src/shared/config/navigation";
import { AppLayout } from "src/widgets/app-layout";
import { DriversScreen } from "./drivers.ui";

export const driversRoute = {
  name: NavigationRoute.DRIVERS,
  screen: DriversScreen,
  layout: AppLayout,
  options: {
    title: "Drivers",
  },
};
