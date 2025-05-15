import { StaticScreenProps } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { selectDriverById } from "src/screens/drivers";
import { useAppSelector } from "src/shared/lib/redux";

type DriverScreenProps = StaticScreenProps<{ driverId: string }>;

export const DriverScreen = ({ route }: DriverScreenProps) => {
  const { driverId } = route.params;

  const driver = useAppSelector((state) => selectDriverById(state, driverId));

  if (!driver) {
    return <Text style={styles.info}>No Data</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {driver.givenName} {driver.familyName}
      </Text>
      <Text style={styles.info}>{driver.nationality}</Text>
      <Text style={styles.info}>{driver.dateOfBirth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#444",
  },
});
