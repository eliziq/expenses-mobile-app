import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({ expenses, period }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{period}</Text>
      <Text style={styles.amountText}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    // height: 60,
    padding: 12,
    marginVertical: 12,
    // marginHorizontal: 4,
    borderRadius: 24,
    // borderColor: 'white',
    borderColor: GlobalStyles.colors.primaryBlue,
    borderWidth: 2,
    backgroundColor: GlobalStyles.colors.transparentWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodText: {
    fontFamily: "libre-franklin-semibold",
    fontSize: 14,
    paddingLeft: 12,
  },
  amountText: { fontFamily: "libre-franklin-semibold", fontSize: 16 },
});
