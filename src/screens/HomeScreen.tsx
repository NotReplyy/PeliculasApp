import { View, ActivityIndicator, ScrollView } from 'react-native';
import React, { useContext, useEffect } from 'react';
import useMovies from '../hooks/useMovies';
import MoviePoster from '../components/MoviePoster';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import { getPostedColors } from '../helpers/getPostedColors';
import { GradientContext } from '../context/GradientContext';


const HomeScreen = () => {
  const { movies, popularMovies, topRatedMovies, upComingMovies, isLoading } = useMovies();
  const { setMainColors } = useContext(GradientContext);
  const { width: windowWidth } = Dimensions.get('window');

  const getColors = async (index: number) => {
    const movie = movies[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'grey', secondary = 'orange'] = await getPostedColors(uri);
    setMainColors({ primary, secondary });
  };

  useEffect(() => {
    if (movies.length > 0) {
      getColors(0);
    }
  }, [movies]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size={100} color="red" />
      </View>
    );
  }


  return (
    <GradientBackground >
      <ScrollView>
        <View style={{
          marginTop: 20,
        }}>
          <View style={{ height: 440 }}>
            <Carousel
              data={movies}
              renderItem={({ item }: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              layout="default"
              inactiveSlideOpacity={0.9}
              onSnapToItem={(index) => getColors(index)}
            />
          </View>
          <HorizontalSlider movies={popularMovies} title={'Populares'} />
          <HorizontalSlider movies={topRatedMovies} title={'Mejor Calificadas'} />
          <HorizontalSlider movies={upComingMovies} title={'Próximamente'} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
