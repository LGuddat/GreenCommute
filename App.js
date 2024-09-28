import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import RoutePlannerScreen from "./screens/RoutePlannerScreen";
import CO2SavingsScreen from "./screens/CO2SavingsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Hjem" }}
        />
        <Stack.Screen
          name="RoutePlanner"
          component={RoutePlannerScreen}
          options={{ title: "Ruteplanlægger" }}
        />
        <Stack.Screen
          name="CO2Savings"
          component={CO2SavingsScreen}
          options={{ title: "CO2-besparelser" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
