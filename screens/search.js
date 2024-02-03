import React from "react";
import { View, TextInput } from "react-native";

const SearchWeather = ({
  weather,
  toggleSearch,
  setToggleSearch,
  city,
  fetchDataWeather,
  fectchTownLongAndLat
}) => {
  const handleSubmit = (e) => {
    if (toggleSearch === "city") {
        fetchDataWeather();
        fectchTownLongAndLat();
    }
    if (toggleSearch === "postal") {
      fetchByPostalHandler();
    }
  };

  const setToggleByCity = () => {
    setToggleSearch("city");
  };

  return (
    <Container style={styles.mainContainer}>
      <View style={styles.container}>
        <ButtonLabel>Search By</ButtonLabel>
        <Buttons
          title="City"
          color={toggleSearch === "city" ? "white" : "rgba(255, 255, 255, 0.6)"}
          accessibilityLabel="Chercher par ville"
          onPress={setToggleByCity}
          onSubmitEditing={handleSubmit}
        />
      </View>
       <View>
            <Text style={styles.weatherText}>Localisation: {city}: timezone : {weather.timezone}</Text>
            <Text style={styles.weatherText}>{weather.current.temp} °C | {weather.current.weather[0].description}</Text>
        </View>
    </Container>
  );
};

const styles = StyleSheet.create({
    container:{
        display: flex,
        flexDirection: row,
        color: white,
        marginTop: 10,
        alignItems: center,
        justifyContent: flex-start,
        width: 95,
        maxWidth: 700,
    },
    searchBar :{
        height: 50,
        margin: 12,
        backgroundColor: white,
        padding: 15,
        borderRadius: 10,
        width: 95,
        maxWidth: 700,
    },
    mainContainer:{
        display: flex,
        justifyContent: center,
        alignItems: center,
        marginTop: 35
    }
});


export default SearchWeather;