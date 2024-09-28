import React, {
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

const API_URL =
  "https://api.open-meteo.com/v1/forecast";

export default function RoutePlannerScreen() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] =
    useState("");
  const [route, setRoute] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?latitude=55.6761&longitude=12.5683&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FCopenhagen`
      );
      if (!response.ok) {
        throw new Error(
          "Kunne ikke hente vejrdata"
        );
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(
        "Fejl ved hentning af vejrdata:",
        error
      );
      setError(
        "Kunne ikke hente vejrdata. Prøv igen senere."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Klar himmel",
      1: "Hovedsageligt klart",
      2: "Delvist skyet",
      3: "Overskyet",
      45: "Tåge",
      48: "Rimtåge",
      51: "Let støvregn",
      53: "Moderat støvregn",
      55: "Kraftig støvregn",
      61: "Let regn",
      63: "Moderat regn",
      65: "Kraftig regn",
      71: "Let sne",
      73: "Moderat sne",
      75: "Kraftig sne",
      80: "Lette regnbyger",
      81: "Moderate regnbyger",
      82: "Voldsomme regnbyger",
      95: "Let til moderat tordenvejr",
      96: "Tordenvejr med let hagl",
      99: "Tordenvejr med kraftigt hagl",
    };
    return weatherCodes[code] || "Ukendt vejr";
  };

  const getTransportRecommendation = () => {
    if (!weather) return "Indlæser anbefaling...";
    const temp = weather.hourly.temperature_2m[0];
    const rainProb =
      weather.hourly.precipitation_probability[0];
    const windSpeed =
      weather.hourly.wind_speed_10m[0];

    if (
      temp > 20 &&
      rainProb < 20 &&
      windSpeed < 20
    )
      return "Perfekt vejr til at cykle!";
    if (rainProb > 50)
      return "Der er risiko for regn - overvej offentlig transport eller regntøj.";
    if (windSpeed > 30)
      return "Det blæser en del - overvej offentlig transport hvis du ikke er til vind i håret.";
    if (temp < 5)
      return "Det er køligt - klæd dig varmt på hvis du cykler eller går.";
    return "Vejret er okay til at gå eller cykle. Husk passende tøj!";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Lad os finde den mest bæredygtige rute til
        dig!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Start"
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <Button
        title="Find grøn rute"
        onPress={() => {
          /* Implementer rutesøgning */
        }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      ) : error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : weather ? (
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherTitle}>
            Nuværende vejr i København:
          </Text>
          <Text>
            Temperatur:{" "}
            {weather.hourly.temperature_2m[0]}°C
          </Text>
          <Text>
            Luftfugtighed:{" "}
            {
              weather.hourly
                .relative_humidity_2m[0]
            }
            %
          </Text>
          <Text>
            Nedbørssandsynlighed:{" "}
            {
              weather.hourly
                .precipitation_probability[0]
            }
            %
          </Text>
          <Text>
            Vindhastighed:{" "}
            {weather.hourly.wind_speed_10m[0]}{" "}
            km/t
          </Text>
          <Text>
            Dagens vejr:{" "}
            {getWeatherDescription(
              weather.daily.weather_code[0]
            )}
          </Text>
          <Text>
            Maks. temperatur i dag:{" "}
            {weather.daily.temperature_2m_max[0]}
            °C
          </Text>
          <Text>
            Min. temperatur i dag:{" "}
            {weather.daily.temperature_2m_min[0]}
            °C
          </Text>
          <Text>
            Samlet nedbør i dag:{" "}
            {weather.daily.precipitation_sum[0]}{" "}
            mm
          </Text>
          <Text style={styles.recommendation}>
            {getTransportRecommendation()}
          </Text>
        </View>
      ) : null}

      {route && (
        <View style={styles.routeInfo}>
          <Text>Afstand: {route.distance}</Text>
          <Text>Varighed: {route.duration}</Text>
          <Text>
            CO2 Sparet: {route.co2Saved}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  weatherInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e6f7ff",
    borderRadius: 5,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendation: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  routeInfo: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
