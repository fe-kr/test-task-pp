import { View, Text, Button, StyleSheet } from "react-native";

type PaginationProps = {
  page: number;
  numberOfPages: number;
  label?: string;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  page,
  label,
  numberOfPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <View style={styles.container}>
      <Button
        title="Prev"
        onPress={() => onPageChange(page - 1)}
        disabled={!page}
      />

      {!!label && <Text>{label}</Text>}

      <Button
        onPress={() => onPageChange(page + 1)}
        title="Next"
        disabled={page === numberOfPages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});
