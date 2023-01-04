import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../constants/styles";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpensesOutput = ({ expenses, period, fallbackText }) => {
  let content = <Text style={styles.fallBackText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <LinearGradient
      colors={[
        GlobalStyles.colors.primaryBlue,
        GlobalStyles.colors.primaryBeige,
      ]}
      style={styles.rootContainer}
    >
      <View style={styles.expensesContainer}>
        <ExpensesSummary expenses={expenses} period={period} />
        {content}
      </View>
    </LinearGradient>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
  expensesContainer: {
    backgroundColor: GlobalStyles.colors.transparentWhite,
    borderRadius: 24,
    paddingBottom: 24,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  fallBackText: {
    fontFamily: "libre-franklin",
    fontSize: 16,
    textAlign: "center",
  },
});
