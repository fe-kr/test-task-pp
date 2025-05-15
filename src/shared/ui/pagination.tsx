import { View, Text, Button, StyleSheet } from "react-native";

type PaginationProps = {
  page: number;
  numberOfPages: number;
  disabled?: boolean;
  label?: string;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  page,
  label,
  disabled,
  numberOfPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <View style={styles.container}>
      <Button
        title="Prev"
        onPress={() => onPageChange(page - 1)}
        disabled={disabled || !numberOfPages || !page}
      />

      {!!label && <Text>{label}</Text>}

      <Button
        onPress={() => onPageChange(page + 1)}
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
