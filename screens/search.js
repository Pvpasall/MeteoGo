import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({ navigation }) => {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        // Ajoutez la logique de recherche ici
        // Par exemple, naviguer vers la page de détails avec la ville sélectionnée
        navigation.navigate('Details', { city });
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