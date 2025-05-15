import { startTransition, useOptimistic } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

type PaginationProps = {
  page: number;
  numberOfPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  page,
  disabled,
  numberOfPages,
  onPageChange,
}: PaginationProps) => {
  const [optimisticPage, setOptimisticPage] = useOptimistic(page);

  const changePage = (pageNumber: number) => {
    startTransition(async () => {
      setOptimisticPage(pageNumber);
      await onPageChange(pageNumber);
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Prev"
        onPress={() => changePage(page - 1)}
        disabled={disabled || !numberOfPages || !page}
      />

      <Text>{`Page ${optimisticPage + 1} of ${numberOfPages}`}</Text>

      <Button
        onPress={() => changePage(page + 1)}
        title="Next"
        disabled={disabled || !numberOfPages || page === numberOfPages - 1}
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
