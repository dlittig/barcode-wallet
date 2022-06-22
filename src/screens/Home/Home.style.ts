import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  divider: {
    width: "100%",
    alignItems: "center",
    marginVertical: 8,
  },
  dividerText: {
    borderRadius: 20,
    backgroundColor: "#33334f",
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  emptyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  emptyText: {
    textAlign: "center",
    padding: 16,
    color: "#ccc",
  },
});

export default styles;
