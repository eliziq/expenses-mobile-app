import { View, Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          mode === "flat" && styles.flat,
          pressed ? styles.pressed : null,
        ]}
      >
        <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    padding: 8,
    backgroundColor: GlobalStyles.colors.lightGrey,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    fontFamily: "libre-franklin-semibold",
    textAlign: "center",
    // color: GlobalStyles.colors.primaryBlue,
  },
  flatText: {
    // color: GlobalStyles.colors.error,
    color: "white",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.transparentWhite,
    borderRadius: 24,
  },
});
