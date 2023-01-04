import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, textInputConfig, invalid }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={invalid ? [styles.input, styles.invalidInput] : styles.input}
        {...textInputConfig}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  label: {
    fontFamily: "libre-franklin-semibold",
    fontSize: 12,
    alignSelf: "flex-end",
    color: GlobalStyles.colors.lightGrey,
    flex: 1,
    // backgroundColor: 'white'
  },
  input: {
    fontFamily: "libre-franklin",
    fontSize: 18,
    minHeight: 30,
    flex: 3,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.lightGrey,
    marginHorizontal: 6,
    // marginBottom: 3,
  },
  invalidInput: {
    borderColor: GlobalStyles.colors.error,
  },
});
