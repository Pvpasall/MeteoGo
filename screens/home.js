import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import SearchWeather from './search';

const Home = ({ navigation }) => {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY
    const [city, setCity] = useState('Paris');
    const [weather, setWeather] = useState({});
    const [toggleSearch, setToggleSearch] = useState("city");
    const [lat, setLat] = useState(48.866667);
    const [long, setLong] = useState(2.333333);

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDataWeather = () => {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${WEATHER_API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            setLat(data.coord.lat);
            setLong(data.coord.lon);
          });
      };

    const fectchTownLongAndLat = () => {
        fetch(
            `https://api-adresse.data.gouv.fr/search/?q=${city}&autocomplete=0`
          )
            .then((res) => res.json())
            .then((data) => {
              setLat(data.features[0].geometry.coordinates[0]);
              setLong(data.features[0].geometry.coordinates[1]);
            });
    }

     //updates the weather when lat long changes
    useEffect(() => {
        fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${WEATHER_API_KEY}`,
        { signal }
        )
        .then((res) => res.json())
        .then((data) => {
            setWeather(data);
        })
        .catch((err) => {
            console.log("error", err);
        });
        return () => controller.abort();
    }, [lat, long]);

    return (
        <>
            <View style={styles.container}>
                <SearchWeather
                  weather={weather}
                  city={city}
                  fetchDataWeather={fetchDataWeather}
                  fectchTownLongAndLat={fectchTownLongAndLat}
                  toggleSearch={toggleSearch}
                  setToggleSearch={setToggleSearch}
                />
                <Button title="Rechercher une Localité" onPress={() => navigation.navigate('Search')} />
                <Text style={styles.title}>Météo en Direct</Text>
                <View style={styles.weatherContainer}>
                    <Text style={styles.weatherText}>Localisation: {city}: timezone : {weather.timezone}</Text>
                    <Text style={styles.weatherText}>{weather.current.temp} °C | {weather.current.weather[0].description}</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#625FAB',
        alignItems: 'left',
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
        alignItems: 'left',
        paddingLeft: 10,
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
