import React, { useEffect, useState } from "react";

function useMoviesList({ page = 1, limit = 20, search = "", genre = null }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(new Map());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setError(null);

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_READ}`,
          },
        };

        let urlMovies = `${
          import.meta.env.VITE_API_URL
        }/discover/movie?language=en-US&page=${page}&include_adult=false&sort_by=popularity.desc`;

        if (search && search.trim().length > 0) {
          urlMovies = `${
            import.meta.env.VITE_API_URL
          }/search/movie?language=en-US&page=${page}&include_adult=false&query=${encodeURIComponent(
            search
          )}`;
        }

        if (genre) {
          urlMovies += `&with_genres=${genre}`;
        }

        // Ambil genre list
        const urlGenre = `${
          import.meta.env.VITE_API_URL
        }/genre/movie/list?language=en`;

        const [movieResponse, genreResponse] = await Promise.all([
          fetch(urlMovies, options),
          fetch(urlGenre, options),
        ]);

        if (!movieResponse.ok) throw new Error("Failed to fetch movies");
        if (!genreResponse.ok) throw new Error("Failed to fetch genres");

        const movieResult = await movieResponse.json();
        const genreResult = await genreResponse.json();

        const genreMap = new Map();
        genreResult.genres.forEach((genre) => {
          genreMap.set(genre.id, genre.name);
        });

        let movies = movieResult.results
          .filter((movie) => !movie.adult)
          .map((movie) => {
            const {
              id,
              title,
              backdrop_path,
              poster_path,
              release_date,
              genre_ids,
            } = movie;

            const genreNames = genre_ids.map((id) => genreMap.get(id));
            return {
              id,
              title,
              backdrop_path,
              poster_path,
              release_date,
              genres: genreNames,
            };
          });

        if (limit && movies.length > limit) {
          movies = movies.slice(0, limit);
        }
        setMovies(movies);
        setGenres(genreMap);
      } catch (err) {
        console.log(err);
        setError(new Error(err.message));
      } finally {
        setLoading(false);
      }
    })();
  }, [page, limit, search, genre]);

  return { movies, genres, loading, error };
}

export default useMoviesList;
