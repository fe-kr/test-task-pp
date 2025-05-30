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
import { useCallback, useEffect } from "react";
import { useAppDispath, useAppSelector } from "src/shared/lib/redux";
import { fetchDriversAction, selectDrivers } from "./drivers.model";
import { ErrorView } from "src/shared/ui/error-view";

export const DriversScreen = () => {
  const dispatch = useAppDispath();
  const { data, page, loading, error, totalPages } =
    useAppSelector(selectDrivers);

  const getDriversPerPage = useCallback(
    (pageNumber: number) => dispatch(fetchDriversAction({ page: pageNumber })),
    [dispatch],
  );

  useEffect(() => {
    const promise = getDriversPerPage(0);

    return () => {
      promise.abort();
    };
  }, [getDriversPerPage]);

  if (error) {
    return (
      <ErrorView message={error} onRetry={() => getDriversPerPage(page)} />
    );
  }

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
        disabled={loading}
        numberOfPages={totalPages}
        onPageChange={getDriversPerPage}
      />
    </View>
  );
};

const DriversTableHeader = () => (
  <TableHeader>
    <TableHeaderCell>Full Name</TableHeaderCell>
    <TableHeaderCell>Nationality</TableHeaderCell>
    <TableHeaderCell>DOB</TableHeaderCell>
    <TableHeaderCell>Races</TableHeaderCell>
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
      <Link
        screen={NavigationRoute.DRIVER_RACES}
        params={{ driverId: item.driverId }}
      >
        Go to Races
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
