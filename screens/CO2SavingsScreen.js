import React, {
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function CO2SavingsScreen() {
  const [totalSavings, setTotalSavings] =
    useState(0);

  useEffect(() => {
    // Her ville vi normalt hente data
    // For nu simulerer vi dette med en timeout
    const timer = setTimeout(() => {
      setTotalSavings(15.7);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dine CO2-besparelser
      </Text>
      <Text style={styles.savings}>
        {totalSavings} kg
      </Text>
      <Text>
        Godt gået! Du reducerer dit CO2-aftryk!
      </Text>
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
  savings: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
