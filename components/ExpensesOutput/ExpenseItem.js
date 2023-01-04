import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
const ExpenseItem = ({ item }) => {
  const navigation = useNavigation();
  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: item.id,
    });
  };

  return (
    <View>
      <Pressable
        onPress={expensePressHandler}
        style={({ pressed }) => [
          styles.expenseItem,
          pressed ? styles.pressed : null,
        ]}
      >
        <View>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={styles.dateText}>{getFormattedDate(item.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    paddingVertical: 6,
    paddingLeft: 24,
    paddingRight: 8,
    marginBottom: 12,
    backgroundColor: GlobalStyles.colors.lightGrey,
    borderRadius: 24,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionText: { fontFamily: "libre-franklin-semibold", fontSize: 16 },
  dateText: { fontFamily: "libre-franklin", fontSize: 12 },
  amountContainer: {
    backgroundColor: GlobalStyles.colors.transparentWhite,
    borderRadius: 18,
    borderColor: GlobalStyles.colors.primaryBeige,
    borderWidth: 1,
    padding: 8,
    minWidth: 80,
    alignItems: "center", 
  },
  amountText: { fontFamily: "libre-franklin-semibold" },
  pressed: {
    opacity: 0.75,
    // backgroundColor: GlobalStyles.colors.primaryBeige
  },
});
