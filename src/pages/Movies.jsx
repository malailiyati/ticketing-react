import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useMoviesList from "../hooks/MoviesList";

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ambil nilai awal dari query param
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("title") || "");
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get("genre") ? searchParams.get("genre").split(",") : []
  );

  const totalPages = 4;
  const { movies, genres, loading, error } = useMoviesList({
    page,
    limit: 12,
    title: searchTerm,
    genre: selectedGenres,
    endpoint: "/movie",
  });

  // setiap kali state berubah → update query param di browser
  useEffect(() => {
    const params = {};
    if (page) params.page = page;
    if (searchTerm) params.title = searchTerm;
    if (selectedGenres.length > 0) params.genre = selectedGenres.join(",");
    setSearchParams(params);
  }, [page, searchTerm, selectedGenres, setSearchParams]);

  // Handler klik filter genre
  const toggleGenre = (genreName) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreName)) {
        return prev.filter((g) => g !== genreName);
      } else {
        return [...prev, genreName];
      }
    });
    setPage(1); // reset page ke 1
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const getPosterUrl = (poster) => {
    if (!poster) return "https://via.placeholder.com/300x450?text=No+Image";
    if (poster.startsWith("http")) return poster;
    return `/img/${poster}`;
  };
  return (
    <main>
      <section className="relative bg-overlay-img bg-cover bg-center h-[350px] text-white flex items-center pl-10 overflow-hidden mt-16">
        {/* Content */}
        <div className="relative z-20 max-w-[700px] p-12">
          <p className="text-sm">LIST MOVIE OF THE WEEK</p>
          <h1 className="text-[40px] font-medium leading-[55px] mt-2 max-w-[700px]">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          <span className="w-1.5 h-1 rounded-full bg-opacity-80 w-[24px] rounded-full bg-blue-700"></span>
          <span className="w-1.5 h-1 rounded-full bg-white bg-opacity-80"></span>
          <span className="w-1.5 h-1 rounded-full bg-white bg-opacity-80"></span>
        </div>
      </section>

      <div className="p-5">
        {/* Search Input */}
        <div className="mb-8">
          <label htmlFor="search" className="block mb-2 text-lg font-semibold">
            Cari Event
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="New Born Expert"
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Filter Genres */}
        <h3 className="text-xl font-bold mb-2">Filter</h3>
        <section className="flex gap-2 flex-wrap mb-8">
          {genres.length > 0 &&
            genres.map((genreName, idx) => (
              <p
                key={idx}
                onClick={() => toggleGenre(genreName)}
                className={`cursor-pointer px-4 py-2 rounded-[30px] text-sm ${
                  selectedGenres.includes(genreName)
                    ? "bg-blue-600 text-white"
                    : "bg-[#a0a3bd1a] text-[var(--colortwo)]"
                }`}
              >
                {genreName}
              </p>
            ))}
        </section>

        {/* Movies Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {!loading &&
            !error &&
            movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white w-full rounded-[12px] shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={getPosterUrl(movie.poster)}
                    alt={movie.title}
                    className="w-full h-[450px] object-cover object-center rounded-[8px]"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-[8px]">
                    <Link
                      to={`/ticketing/movies/${movie.id}`}
                      className="min-w-[180px] py-3 text-sm text-white text-center border border-white bg-white/10 rounded-[6px] hover:bg-white/30"
                    >
                      Details
                    </Link>
                    <a
                      href="#"
                      className="min-w-[180px] py-3 text-sm text-white text-center bg-[var(--color)] rounded-[6px] hover:bg-[#163899]"
                    >
                      Ticket
                    </a>
                  </div>
                </div>
                <Link>
                  <h3 className="text-xl font-semibold mt-3 mx-[10px] hover:text-blue-600">
                    {movie.title}
                  </h3>
                </Link>
                <div className="flex flex-wrap mx-[10px] gap-2 mt-2 mb-4">
                  {movie.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="text-[var(--colortwo)] bg-[#a0a3bd1a] px-4 py-2 rounded-[30px] text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </section>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-blue-500 disabled:opacity-50"
          >
            ←
          </button>

          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold hover:bg-blue-500 ${
                page === num
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-blue-500 disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </main>
  );
}

export default Movies;
