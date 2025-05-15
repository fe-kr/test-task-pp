import {
  Table,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableHeader,
} from "src/shared/ui/table";
import { Link } from "@react-navigation/native";
import { Driver } from "./drivers.types";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { NavigationRoute } from "src/shared/config/navigation";
import { Pagination } from "src/shared/ui/pagination";

export const DriversScreen = () => {
  return (
    <View style={styles.container}>
      <Table
        data={[]}
        numColumns={4}
        renderItem={DriversTableRow}
        ListHeaderComponent={DriversTableHeader}
      />
      <Pagination page={0} numberOfPages={1} onPageChange={() => {}} />
    </View>
  );
};

const DriversTableHeader = () => (
  <TableHeader>
    <TableHeaderCell>Full Name</TableHeaderCell>
    <TableHeaderCell>Nationality</TableHeaderCell>
    <TableHeaderCell>Date Of Birth</TableHeaderCell>
    <TableHeaderCell />
  </TableHeader>
);

const DriversTableRow = ({ item }: ListRenderItemInfo<Driver>) => (
  <TableRow key={item.driverId}>
    <TableCell>
      <Link
        screen={NavigationRoute.DRIVER}
        params={{ driverId: item.driverId }}
      >
        {item.givenName} {item.familyName}
      </Link>
    </TableCell>
    <TableCell>{item.nationality}</TableCell>
    <TableCell>{item.dateOfBirth}</TableCell>
    <TableCell>
      <Link screen={NavigationRoute.RACES} params={{ driverId: item.driverId }}>
        Races
      </Link>
    </TableCell>
  </TableRow>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
