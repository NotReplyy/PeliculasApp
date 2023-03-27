import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { MovieDetails } from '../interfaces/MovieInterface';
import { Cast } from '../interfaces/CreditsInterface';
import CastItem from './CastItem';
import Icon from 'react-native-vector-icons/MaterialIcons';


interface Props {
  details: MovieDetails,
  credits: Cast[],
}

const MovieDetail = ({ details, credits }: Props) => {
  return (
    <>
      {/* Details */}
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="star-outline"
            size={20}
            color="grey"
          />
          <Text style={{ fontSize: 16, opacity: 0.6, marginLeft: 5 }}>{details.vote_average.toFixed(2)}</Text>
          <Text style={{ marginLeft: 5 }}>
            - {details.genres.map(g => g.name).join(', ')}
          </Text>
        </View>
        <View >
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Historia</Text>
          <Text style={{ fontSize: 16, opacity: 0.6, marginLeft: 5, marginTop: 10 }}>{details.overview}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Presupuesto</Text>
          <Text style={{ fontSize: 16, opacity: 0.6, marginLeft: 5, marginTop: 10 }}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(details.budget)
            }
          </Text>
        </View>
      </View>
      {/* Cast */}
      <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>Actores</Text>
        </View>
        <View>
          <FlatList
            data={credits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CastItem actor={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, height: 70 }}
          />
          {/* <CastItem actor={credits[0]} /> */}
        </View>
      </View>

    </>
  );
};

export default MovieDetail;
