import { View, Text, FlatList } from 'react-native';
import React from 'react';
import MoviePoster from './MoviePoster';
import { Movie } from '../interfaces/MovieInterface';

interface Props {
    movies: Movie[];
    title?: string;
}



const HorizontalSlider = ({movies , title}:Props) => {
  return (
    <View style={{ height: title ? 260 : 220 }} >
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>{title}</Text>
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MoviePoster movie={item} height={210} width={150} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
    </View>
  );
};

export default HorizontalSlider;
