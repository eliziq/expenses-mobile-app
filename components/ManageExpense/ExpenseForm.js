import { View, StyleSheet, Alert, Text } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

const ExpenseForm = ({ onCancel, onSubmit, submitBtnLabel, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount + "" : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString() : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangedHandler = (inputIdentifyer, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifyer]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Input
        invalid={!inputs.amount.isValid}
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          // onChangeText: (e) => inputChangedHandler("amount", e.value),
          value: inputs.amount.value,
          onChangeText: inputChangedHandler.bind(this, "amount"),
        }}
      />
      <Input
        invalid={!inputs.date.isValid}
        label="Date"
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          value: inputs.date.value,
          onChangeText: inputChangedHandler.bind(this, "date"),
        }}
      />
      <Input
        invalid={!inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          maxLength: 25,
          value: inputs.description.value,
          onChangeText: inputChangedHandler.bind(this, "description"),
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.buttonStyle}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.buttonStyle}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    backgroundColor: GlobalStyles.colors.transparentWhite,
    borderRadius: 24,
    paddingLeft: 12,
    paddingRight: 24,
    paddingVertical: 24,
    marginBottom: 24,
    marginTop: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: "40%",
  },
  errorText: {
    color: GlobalStyles.colors.error,
    textAlign: "center",
    paddingBottom: 12,
    fontSize: 16,
  },
  
});
