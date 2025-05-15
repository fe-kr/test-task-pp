import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import {
  Table,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableHeader,
} from "src/shared/ui/table";
import { DriverRace } from "./driver-races.api";
import { Pagination } from "src/shared/ui/pagination";
import { useCallback, useEffect } from "react";
import { useAppDispath, useAppSelector } from "src/shared/lib/redux";
import {
  selectDriverRaces,
  fetchDriverRacesAction,
  driverRacesActions,
} from "./driver-races.model";
import { StaticScreenProps } from "@react-navigation/native";
import { ErrorView } from "src/shared/ui/error-view";

type DriverRacesScreenProps = StaticScreenProps<{ driverId: string }>;

export const DriverRacesScreen = ({ route }: DriverRacesScreenProps) => {
  const dispatch = useAppDispath();

  const { driverId } = route.params;
  const { data, page, error, loading, totalPages } =
    useAppSelector(selectDriverRaces);

  const getDriverRacesPerPage = useCallback(
    (pageNumber: number) =>
      dispatch(fetchDriverRacesAction({ page: pageNumber, driverId })),
    [dispatch, driverId],
  );

  useEffect(() => {
    const promise = getDriverRacesPerPage(0);

    return () => {
      promise.abort();
      dispatch(driverRacesActions.reset());
    };
  }, [getDriverRacesPerPage, dispatch]);

  if (error) {
    return (
      <ErrorView message={error} onRetry={() => getDriverRacesPerPage(page)} />
    );
  }

  return (
    <View style={styles.container}>
      <Table
        isLoading={loading}
        data={data}
        numColumns={5}
        renderItem={DriverRacesTableRow}
        ListHeaderComponent={DriverRacesTableHeader}
      />

      <Pagination
        page={page}
        disabled={loading}
        numberOfPages={totalPages}
        onPageChange={getDriverRacesPerPage}
      />
    </View>
  );
};

const DriverRacesTableHeader = () => (
  <TableHeader>
    <TableHeaderCell>Race Name</TableHeaderCell>
    <TableHeaderCell>Season/Round</TableHeaderCell>
    <TableHeaderCell>Circuit</TableHeaderCell>
    <TableHeaderCell>Country</TableHeaderCell>
    <TableHeaderCell>Date</TableHeaderCell>
  </TableHeader>
);

const DriverRacesTableRow = ({ item }: ListRenderItemInfo<DriverRace>) => (
  <TableRow key={`${item.season}/${item.round}`}>
    <TableCell>{item.raceName}</TableCell>
    <TableCell>
      {item.season}/{item.round}
    </TableCell>
    <TableCell>{item.Circuit.circuitName}</TableCell>
    <TableCell>{item.Circuit.Location.country}</TableCell>
    <TableCell>{item.date}</TableCell>
  </TableRow>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
