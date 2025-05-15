import {
  Table,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableHeader,
} from "src/shared/ui/table";
import { Link } from "@react-navigation/native";
import { Driver } from "./drivers.api";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { NavigationRoute } from "src/shared/config/navigation";
import { Pagination } from "src/shared/ui/pagination";
import { useEffect } from "react";
import { useAppDispath, useAppSelector } from "src/shared/lib/redux";
import { fetchDriversAction, selectDrivers } from "./drivers.model";

export const DriversScreen = () => {
  const dispatch = useAppDispath();
  const { data, page, loading, totalPages } = useAppSelector(selectDrivers);

  useEffect(() => {
    dispatch(fetchDriversAction({ page: 0 }));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Table
        isLoading={loading}
        data={data}
        numColumns={4}
        renderItem={DriversTableRow}
        ListHeaderComponent={DriversTableHeader}
      />

      <Pagination
        page={page}
        numberOfPages={totalPages!}
        label={`Page ${page + 1} of ${totalPages}`}
        onPageChange={(page) => dispatch(fetchDriversAction({ page }))}
      />
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
