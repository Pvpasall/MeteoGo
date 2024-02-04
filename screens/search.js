import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({ navigation }) => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);
    const WEATHER_API_KEY = "736176e0d56b977e2818632d7e0a2864";

    const handleSearch = () => {
        fetchDataWeatherMap();
    };

    const fetchDataWeatherMap = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setLatitude(data.coord.lat);
                setLongitude(data.coord.lon);

                fetchWeatherData();
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    };

    const fetchWeatherData = () => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rechercher d'une localité</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom de la localité"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    autoFocus={true}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchIconContainer}>
                    <Icon name="search" size={20} color="white" />
                </TouchableOpacity>
                <View>
                    <Text>Localisation: {city}: timezone : {weather.timezone}</Text>
                    <Text>{weather.current.temp} °C | {weather.current.weather[0].description}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#625FAB',
        alignItems: 'center',
        justifyContent: 'top',
        padding: 20,
    },
    title: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'left',
        width: '100%',
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    searchIconContainer: {
        margin: 10,
    },
});

export default Search;
