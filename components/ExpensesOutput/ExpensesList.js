import { FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => <ExpenseItem item={itemData.item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
