import { NavigationRoute } from "src/shared/config/navigation";
import { AppLayout } from "src/widgets/app-layout";
import { DriverScreen } from "./driver.ui";

export const driverRoute = {
  name: NavigationRoute.DRIVER,
  screen: DriverScreen,
  layout: AppLayout,
  options: {
    title: "Driver",
  },
};
