import { View, Text } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Home() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home,
  },
});

export const NavigationProvider = createStaticNavigation(RootStack);

export const App = () => {
  return <NavigationProvider />;
};
