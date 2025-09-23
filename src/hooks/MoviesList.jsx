import { useState, useEffect, useRef } from "react";

function useMoviesList({ page, limit, title, genre, endpoint = "/movie" }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]); // id → nama
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // simpan state sudah pernah ambil genre fix belum
  const hasLockedGenres = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // gabung genres array → string
        let genreParam = "";
        if (Array.isArray(genre) && genre.length > 0) {
          genreParam = genre.join(","); // "Action,Drama"
        } else if (typeof genre === "string") {
          genreParam = genre;
        }

        const params = new URLSearchParams();
        if (page !== undefined) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (title) params.append("title", title);
        if (genre) params.append("genre", genreParam);

        let cleanEndpoint = endpoint.startsWith("/")
          ? endpoint
          : `/${endpoint}`;
        const url = `${
          import.meta.env.VITE_BE_HOST
        }${cleanEndpoint}?${params.toString()}`;

        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error("Gagal fetch movies");

        const data = await res.json();

        // Backend balikin { data: [], genres: [] }
        setMovies(data.data || []);

        if (!hasLockedGenres.current) {
          let allGenres = [];
          if (data.genres) {
            // kalau backend sudah kirim data.genres (array)
            allGenres = data.genres;
          } else {
            // fallback: ambil genre unik dari data.data
            const temp = new Set();
            data.data?.forEach((movie) => {
              if (Array.isArray(movie.genres)) {
                movie.genres.forEach((g) => temp.add(g));
              } else if (typeof movie.genres === "string") {
                movie.genres
                  .split(",")
                  .map((g) => g.trim())
                  .forEach((g) => temp.add(g));
              }
            });
            allGenres = Array.from(temp);
          }
          setGenres(allGenres);
          hasLockedGenres.current = true; // kunci supaya tidak berubah lagi
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [page, limit, title, genre, endpoint]);

  return { movies, genres, loading, error };
}

export default useMoviesList;

// import React, { useEffect, useState } from "react";

// function useMoviesList({ page = 1, limit = 20, search = "", genre = null }) {
//   const [movies, setMovies] = useState([]);
//   const [genres, setGenres] = useState(new Map());
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async function () {
//       try {
//         setLoading(true);
//         setError(null);

//         const options = {
//           method: "GET",
//           headers: {
//             accept: "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_API_READ}`,
//           },
//         };

//         let urlMovies = `${
//           import.meta.env.VITE_API_URL
//         }/discover/movie?language=en-US&page=${page}&include_adult=false&sort_by=popularity.desc`;

//         if (search && search.trim().length > 0) {
//           urlMovies = `${
//             import.meta.env.VITE_API_URL
//           }/search/movie?language=en-US&page=${page}&include_adult=false&query=${encodeURIComponent(
//             search
//           )}`;
//         }

//         if (genre) {
//           urlMovies += `&with_genres=${genre}`;
//         }

//         // Ambil genre list
//         const urlGenre = `${
//           import.meta.env.VITE_API_URL
//         }/genre/movie/list?language=en`;

//         const [movieResponse, genreResponse] = await Promise.all([
//           fetch(urlMovies, options),
//           fetch(urlGenre, options),
//         ]);

//         if (!movieResponse.ok) throw new Error("Failed to fetch movies");
//         if (!genreResponse.ok) throw new Error("Failed to fetch genres");

//         const movieResult = await movieResponse.json();
//         const genreResult = await genreResponse.json();

//         const genreMap = new Map();
//         genreResult.genres.forEach((genre) => {
//           genreMap.set(genre.id, genre.name);
//         });

//         let movies = movieResult.results
//           .filter((movie) => !movie.adult)
//           .map((movie) => {
//             const {
//               id,
//               title,
//               backdrop_path,
//               poster_path,
//               release_date,
//               genre_ids,
//             } = movie;

//             const genreNames = genre_ids.map((id) => genreMap.get(id));
//             return {
//               id,
//               title,
//               backdrop_path,
//               poster_path,
//               release_date,
//               genres: genreNames,
//             };
//           });

//         if (limit && movies.length > limit) {
//           movies = movies.slice(0, limit);
//         }
//         setMovies(movies);
//         setGenres(genreMap);
//       } catch (err) {
//         console.log(err);
//         setError(new Error(err.message));
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [page, limit, search, genre]);

//   return { movies, genres, loading, error };
// }

// export default useMoviesList;
