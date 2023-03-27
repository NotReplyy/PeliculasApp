import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetail';
import Icon from 'react-native-vector-icons/MaterialIcons';


const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> { }

const DetailScreen = ({ route, navigation }: Props) => {

  const movie = route.params;

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, movieDetails, movieCredits } = useMovieDetails(movie.id);

  return (
    <ScrollView >
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder} >
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
      </View >

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle} >{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        {/* <Icon name="star-outline" color="grey" size={20} />
        <Text>{movieDetails?.vote_average}</Text> */}
        {isLoading ?
          <ActivityIndicator size={30} color="grey" />
          : <MovieDetails details={movieDetails!} credits={movieCredits} />
        }
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon
          name="arrow-back"
          color="white"
          size={60}
        />
      </TouchableOpacity>

    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
    backgroundColor: 'grey',
    borderRadius: 100,
  },
});
