import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';

// Avoir l'icon correspondant au meteo
const iconMappings = {
    '01d': 'sun-o',
    '02d': 'cloud',
    '03d': 'cloud',
    '04d': 'cloud',
    '09d': 'umbrella',
    '10d': 'tint',
    '11d': 'bolt',
    '13d': 'snowflake-o',
    '50d': 'align-justify',
    '01n': 'moon-o',
    '02n': 'cloud',
    '03n': 'cloud',
    '04n': 'cloud',
    '09n': 'umbrella',
    '10n': 'tint',
    '11n': 'bolt',
    '13n': 'snowflake-o',
    '50n': 'align-justify',
};

// Composant pour afficher l'icone
const WeatherIcon = ({ icon }) => {

    return <Icon name={icon} size={50} color="white" />;
};


const Home = ({ navigation }) => {
    const [weatherData, setWeatherData] = useState({});
    const [favoriteLocations, setFavoriteLocations] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const WEATHER_API_KEY = "736176e0d56b977e2818632d7e0a2864"


    // recuperer localisation en direct
    const getLocationAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } catch (error) {
            console.error('Error getting location:', error);
            setErrorMsg('Error getting location');
        }
    };

    // traduire les description en francais
    const traductionDescriptions = {
        'Clear': 'Dégagé',
        'Clouds': 'Nuageux',
        'Rain': 'Pluie',
        'Snow': 'Neige',
        'Thunderstorm': 'Orage',
    };

    // Afficher localisation en direct et favoris  
    useEffect(() => {

        getLocationAsync();

        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_API_KEY}`)
            .then(response => {
                const temperatureCelsius = Math.floor(response.data.main.temp - 273.15);
                const descriptionEnAnglais = response.data.weather[0].main;
                const descriptionEnFrancais = traductionDescriptions[descriptionEnAnglais] || descriptionEnAnglais;
                setWeatherData({
                    temp: temperatureCelsius,
                    description: descriptionEnFrancais,
                    country: response.data.name,
                    icon: response.data.weather[0].icon
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        axios.get('https://api-adresse.data.gouv.fr/search/?q=Paris&autocomplete=0')
            .then(response => {
                const coordinates = response.data.features[0].geometry.coordinates;
                setFavoriteLocations([
                    { name: 'Paris', temperature: 20, description: 'Nuageux', icon: '04d' },
                    { name: 'New York', temperature: 28, description: 'Ensoleillé', icon: '01d' },
                    { name: 'Tokyo', temperature: 24, description: 'Pluvieux', icon: '10n' },
                ]);
            })
            .catch(error => {
                console.error('Error fetching favorite locations data:', error);
            });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.favoriteItem}>
            <WeatherIcon style={styles.weatherIcon} icon={iconMappings[weatherData.icon]} />
            <Text style={styles.favoriteText}>{item.name}</Text>
            <Text style={styles.favoriteText}>{item.temperature} °C | {item.description}</Text>
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                <Button title="Rechercher une Localité" onPress={() => navigation.navigate('Search')} />
                <Text style={styles.title}>Météo en Direct</Text>
                <View style={styles.weatherContainer}>
                    <WeatherIcon style={styles.weatherIcon} icon={iconMappings[weatherData.icon]} />
                    <Text style={styles.weatherText}>Localisation: {weatherData.country}</Text>
                    <Text style={styles.weatherText}>{weatherData.temp} °C | {weatherData.description}</Text>
                </View>
                <Text style={styles.favoritesTitle}>Localisations Favorites</Text>
                <FlatList
                    data={favoriteLocations}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#625FAB',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        alignItems: 'center'
    },
    weatherContainer: {
        backgroundColor: '#4F27C0',
        padding: 20,
        borderRadius: 25,
        marginTop: 20,
        alignItems: 'center',
        paddingLeft: 10,
    },
    weatherIcon: {
        alignItems: 'center',
        margin: 15,
    },
    weatherText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    favoritesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    favoriteItem: {
        fontSize: 50,
        backgroundColor: '#4F27C0',
        padding: 15,
        borderRadius: 25,
        marginBottom: 10,
    },
    favoriteText: {
        color: '#fff',
    }
});

export default Home;
