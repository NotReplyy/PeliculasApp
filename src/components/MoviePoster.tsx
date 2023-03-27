import { View, Image } from 'react-native';
import React from 'react';
import { Movie } from '../interfaces/MovieInterface';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'Home'>

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { navigate } = useNavigation<HomeScreenNavigationProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate('DetailsScreen', movie)}
      style={{
        width,
        height,
        marginHorizontal: 2,
        paddingBottom: 20,
        paddingHorizontal: 7,
      }}>
      <View style={styles.container}>
        {movie.poster_path && (
          <Image source={{ uri }} style={styles.image} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});
