import {
  FlatList,
  ScrollView,
  FlatListProps,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Loader } from "./loader";

export const TableHeader = ({ children }: React.PropsWithChildren) => {
  return <View style={styles.header}>{children}</View>;
};

export const TableHeaderCell = ({ children }: React.PropsWithChildren) => {
  return (
    <View style={[styles.headerCell, styles.cell]}>
      <Text style={styles.headerText}>{children}</Text>
    </View>
  );
};

export const TableRow = ({ children }: React.PropsWithChildren) => {
  return <View style={styles.row}>{children}</View>;
};

export const TableCell = ({ children }: React.PropsWithChildren) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.cellText}>{children}</Text>
    </View>
  );
};

export const TablePlaceholder = () => {
  return (
    <View style={styles.placeholder}>
      <Text>No Data</Text>
    </View>
  );
};

export const Table = <T,>({
  isLoading,
  data,
  ...props
}: FlatListProps<T> & { isLoading?: boolean }) => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <FlatList
        {...props}
        data={isLoading ? [] : data}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={isLoading ? Loader : TablePlaceholder}
        stickyHeaderIndices={[0]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  flatList: {
    flexGrow: 1,
  },
  columnWrapperStyle: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f6f6f6",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerCell: {
    backgroundColor: "#eaeaea",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  cell: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 14,
    color: "#555",
  },
  placeholder: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
