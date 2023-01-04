import { View, StyleSheet, Text } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext as ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense. Please try again later.");
      setIsSubmitting(false);
    }
  }
  const errorHandler = () => {
    setError(null);
  };
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onPress={errorHandler} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  const cancelHandler = () => {
    navigation.goBack();
  };
  async function saveExpenseHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Couldnt save expense. Please try again later");
      setIsSubmitting(false);
    }
  }

  return (
    <LinearGradient
      colors={[
        GlobalStyles.colors.primaryBlue,
        GlobalStyles.colors.primaryBeige,
      ]}
      style={styles.rootContainer}
    >
      <Text style={styles.title}>Describe Your Expense</Text>
      <ExpenseForm
        onCancel={cancelHandler}
        submitBtnLabel={isEditing ? "Update" : "Add"}
        onSubmit={saveExpenseHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            size={24}
            color={GlobalStyles.colors.error}
            icon="trash"
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </LinearGradient>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: "libre-franklin",
    fontSize: 24,
    textAlign: "center",
    color: GlobalStyles.colors.primaryBeige,
    marginTop: 32,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primaryBeige,
    alignItems: "center",
  },
});
