import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Cast } from '../interfaces/CreditsInterface';

interface Props {
    actor: Cast;
}

const CastItem = ({ actor }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

    return (
        <View style={styles.container}>
            {actor.profile_path && (
            <Image source={{ uri }} style={styles.image} />
            )}
            <View style={styles.actorInfo}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{actor.name}</Text>
                <Text style={{ fontSize: 16, opacity: 0.8 }}>{actor.character}</Text>
            </View>
        </View>
    );
};

export default CastItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 50,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        marginRight: 20,
        paddingRight: 15,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 10,
    },
    actorInfo: {
        marginLeft: 10,
        marginTop: 4,
    },

});
