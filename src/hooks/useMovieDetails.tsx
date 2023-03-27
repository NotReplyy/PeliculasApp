import { useEffect, useState } from 'react';
import movieDB from '../api/MovieDB';
import { Cast, MovieCredits } from '../interfaces/CreditsInterface';
import { MovieDetails } from '../interfaces/MovieInterface';

interface MovieDetailsState {
    isLoading: boolean;
    movieDetails?: MovieDetails;
    movieCredits: Cast[];
}

const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetailsState>({
        isLoading: true,
        movieDetails: undefined,
        movieCredits: [],
    });

    const getMovieDetails = async () => {
        const movieDetailsPromise = await movieDB.get<MovieDetails>(`/${movieId}`);
        const movieCreditsPromise = await movieDB.get<MovieCredits>(`/${movieId}/credits`);
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
            movieDetailsPromise,
            movieCreditsPromise,
        ]);
            setState({
                isLoading: false,
                movieDetails: movieDetailsResponse.data,
                movieCredits: movieCreditsResponse.data.cast,
            });
    };

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state,
    };
};

export default useMovieDetails;
