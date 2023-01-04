import { ActivityIndicator, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";

const LoadingOverlay = () => {
  return (
    <LinearGradient
      colors={[
        GlobalStyles.colors.primaryBlue,
        GlobalStyles.colors.primaryBeige,
      ]}
      style={styles.container}
    >
      <ActivityIndicator size="large" color="white" />
    </LinearGradient>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
