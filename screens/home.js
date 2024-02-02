import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const Home = () => {
    const weatherData = {
        temp: 25,
        description: 'Ensoleillé',
        country: "Paris"
    };

    const favoriteLocations = [
        { name: 'Paris', temperature: 20, description: 'Nuageux' },
        { name: 'New York', temperature: 28, description: 'Ensoleillé' },
        { name: 'Tokyo', temperature: 24, description: 'Pluvieux' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.favoriteItem}>
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
