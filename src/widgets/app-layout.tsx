import { StyleSheet, View } from "react-native";

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
