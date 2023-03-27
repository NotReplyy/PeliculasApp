import { useEffect, useState } from 'react';
import movieDB from '../api/MovieDB';
import { Movie, MovieDbResponse } from '../interfaces/MovieInterface';


interface MoviesState {
    movies: Movie[];
    isLoading: boolean;
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    upComingMovies: Movie[];
}

const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        movies: [],
        isLoading: true,
        popularMovies: [],
        topRatedMovies: [],
        upComingMovies: [],
    });

    const getMovies = async () => {
        const moviesPromise = await movieDB.get<MovieDbResponse>('/now_playing');
        const popularMoviesPromise = await movieDB.get<MovieDbResponse>('/popular');
        const topRatedMoviesPromise = await movieDB.get<MovieDbResponse>('/top_rated');
        const upComingMoviesPromise = await movieDB.get<MovieDbResponse>('/upcoming');

        const response = await Promise.all([
            moviesPromise,
            popularMoviesPromise,
            topRatedMoviesPromise,
            upComingMoviesPromise,
        ]);

        setMoviesState({
            movies: response[0].data.results,
            popularMovies: response[1].data.results,
            topRatedMovies: response[2].data.results,
            upComingMovies: response[3].data.results,
            isLoading: false,
        });
        setIsLoading(false);
    };


    useEffect(() => {
        getMovies();
    }, []);

    return {
        ...moviesState,
        isLoading,
    };
};

export default useMovies;

