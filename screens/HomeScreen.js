import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

export default function HomeScreen({
  navigation,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Velkommen til GreenCommute
      </Text>
      <Button
        title="Planlæg din rute"
        onPress={() =>
          navigation.navigate("RoutePlanner")
        }
      />
      <Button
        title="Se dine CO2-besparelser"
        onPress={() =>
          navigation.navigate("CO2Savings")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
