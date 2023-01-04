import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverwiew = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primaryBlue },
        headerTitleStyle: { fontFamily: "libre-franklin-bold", fontSize: 22 },
        headerTintColor: "white",
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primaryBlue,
        },
        tabBarLabelStyle: { fontFamily: "libre-franklin" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: GlobalStyles.colors.primaryBeige,
        headerRight: ({ size, tintColor }) => (
          <IconButton
            icon="add"
            size={30}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Recent Expenses"
        component={RecentExpenses}
        options={{
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "libre-franklin": require("./assets/fonts/libre-franklin.ttf"),
    "libre-franklin-bold": require("./assets/fonts/LibreFranklin-Bold.ttf"),
    "libre-franklin-semibold": require("./assets/fonts/LibreFranklin-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primaryBlue },
              headerTitleStyle: {
                fontFamily: "libre-franklin-bold",
                fontSize: 22,
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
             
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverwiew}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
