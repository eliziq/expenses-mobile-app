import { Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import Button from "./Button";

const ErrorOverlay = ({ message, onPress }) => {
  return (
    <LinearGradient
      colors={[
        GlobalStyles.colors.primaryBlue,
        GlobalStyles.colors.primaryBeige,
      ]}
      style={styles.container}
    >
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onPress}>Okay</Button>
    </LinearGradient>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "libre-franklin",
    color: "white",
  },
  title: {
    fontSize: 20,
    fontFamily: "libre-franklin-bold",
  },
});
