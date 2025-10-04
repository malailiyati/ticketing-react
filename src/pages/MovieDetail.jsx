/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  setCinema,
  setScheduleDate,
  setScheduleId,
  setScheduleTime,
} from "../../redux/slices/orderSlice";
import { cinemaLogos } from "../constants/CinemaLogos";

import {
  setMoviePoster,
  setMovieTitle,
  setSelectedDate,
  setSelectedTime,
  setMovieGenre,
} from "../../redux/slices/orderSlice";

function MovieDetail() {
  const dispatch = useDispatch();
  const { selectedDate, selectedTime } = useSelector((state) => state.order);
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  // const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BE_HOST}/movie/${movieId}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");

        const movieData = await res.json();
        setMovie(movieData);

        // update redux
        dispatch(setMoviePoster(movieData.poster));
        dispatch(setMovieTitle(movieData.title));
        dispatch(setMovieGenre(movieData.genres));
      } catch (err) {
        console.error("Error fetching movie detail:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId]);

  // fetch schedule
  useEffect(() => {
    if (!movieId) return;
    (async () => {
      setLoadingSchedules(true);
      const res = await fetch(
        `${
          import.meta.env.VITE_BE_HOST
        }/movie/${movieId}/schedule?date=${selectedDate}&time_id=${selectedTime}&location_id=${selectedLocation}`
      );
      const json = await res.json();
      setSchedules(json.data || []);
      setLoadingSchedules(false);
    })();
  }, [movieId]);

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (!movie || !movie.title) {
    return <p className="text-center mt-10 text-red-600">Movie not found.</p>;
  }

  function dateHandle(e) {
    dispatch(setSelectedDate(e.target.value));
  }

  function timeHandle(e) {
    dispatch(setSelectedTime(e.target.value));
  }

  function locationHandle(e) {
    setSelectedLocation(e.target.value);
  }

  const handleCinemaClick = (id) => {
    if (selectedCinema === id) {
      setSelectedCinema(null);
    } else {
      setSelectedCinema(id);
    }
  };

  const handleFilter = async () => {
    try {
      setLoadingSchedules(true);
      setSelectedCinema(null); // <<< tambahin ini
      const res = await fetch(
        `${
          import.meta.env.VITE_BE_HOST
        }/movie/${movieId}/schedule?date=${selectedDate}&time_id=${selectedTime}&location_id=${selectedLocation}`
      );
      if (!res.ok) throw new Error("Failed to fetch schedules");
      const data = await res.json();
      setSchedules(data.data || []); // pastikan array
      setIsFiltered(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSchedules(false);
    }
  };

  return (
    <>
      <section>
        <img
          src={movie.background_poster}
          alt={movie.title}
          className="relative w-full h-200 md:h-150"
        />
        {/* Poster */}
        <img
          img
          src={movie.poster}
          alt={movie.title}
          className="absolute top-40 md:top-90 left-30 md:w-80 rounded-lg shadow-md"
        />
        <div className="max-w-6xl mx-10 px-4 py-6 mt-30 md:mt-1">
          <div className="md:ml-110 flex flex-col md:flex-row gap-10 items-start">
            {/* Details */}
            <div className="flex-1">
              <h1
                className="text-3xl md:text-4xl font-bold  mb-4"
                // value={movieTitle}
              >
                {movie.title}
              </h1>

              {/* Genre */}
              {movie.genres && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
              {/* Release Date */}
              <div className="flex justify-between w-69">
                <div>
                  <p className="text-gray-500 text-sm">Release Date</p>
                  <p>{movie.release_date.slice(0, 10)}</p>
                </div>

                {/* director */}
                <div>
                  <p className="text-gray-500 text-sm">Directed by</p>
                  {/* {credits.crew.slice(0, 1).map((director) => (
                    <span key={director.credit_id}> {director.name}</span>
                  ))} */}
                  <span>{movie.director}</span>
                </div>
              </div>

              <div className="flex gap-15 mt-3">
                {/* duration */}
                <div>
                  <p className="text-gray-500 text-sm">Duration</p>
                  <p>{movie.duration}</p>
                </div>

                {/* cast */}
                <div>
                  <p className="text-gray-500 text-sm">Cast</p>
                  <div className="flex flex-wrap gap-1">
                    {movie.casts
                      ?.split(",") // pecah string jadi array
                      .slice(0, 5) // ambil 5 teratas
                      .map((cast, idx, arr) => (
                        <span key={idx}>
                          {cast.trim()}
                          {idx < arr.length - 1 && ","}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overview */}
        <p className="text-gray-500 text-sm leading-relaxed my-12 mx-20 whitespace-normal break-words">
          {movie.synopsis}
        </p>
      </section>

      <section className="mx-[70px]">
        <h2 className="text-[32px] font-normal">Book Tickets</h2>
        <div className="my-[30px] flex justify-between items-center">
          <div>
            <label className="text-base leading-[50px]" htmlFor="date">
              Choose Date
            </label>
            <br />
            <input
              type="date"
              id="date"
              className="flex bg-gray-200 py-[5px] px-[20px] rounded-[5px] w-50 flex justify-center"
              value={selectedDate}
              onChange={dateHandle}
            />
          </div>

          <div>
            <label className="text-base leading-[50px]" htmlFor="time">
              Choose Time
            </label>{" "}
            <br />
            <div className="flex bg-gray-200 py-[5px] px-[20px] rounded-[5px] w-55 flex justify-center">
              <select
                name="time"
                id="time"
                className="bg-gray-200 outline-none"
                value={selectedTime}
                onChange={timeHandle}
              >
                <option value="none">None</option>
                <option value="1">10:00</option>
                <option value="2">13:00</option>
                <option value="3">16:00</option>
                <option value="4">19:30</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-base leading-[50px]" htmlFor="location">
              Choose Location
            </label>{" "}
            <br />
            <div className="flex bg-gray-200 py-[5px] px-[20px] rounded-[5px] w-55 flex justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_19612_417)">
                  <path
                    d="M17.4301 16.2918L16.1998 12.6H14.8498L15.5995 16.2H2.40014L3.14984 12.6H1.79984L0.568636 16.2918C0.256336 17.2314 0.809836 18 1.79984 18H16.1998C17.1898 18 17.7433 17.2314 17.4301 16.2918ZM13.4998 4.5C13.4998 3.30653 13.0257 2.16193 12.1818 1.31802C11.3379 0.474106 10.1933 0 8.99984 0C7.80636 0 6.66177 0.474106 5.81786 1.31802C4.97394 2.16193 4.49984 3.30653 4.49984 4.5C4.49984 8.7975 8.99984 13.5 8.99984 13.5C8.99984 13.5 13.4998 8.7975 13.4998 4.5ZM6.56984 4.554C6.56984 3.2121 7.65704 2.1249 8.99984 2.1249C9.64419 2.1249 10.2622 2.38087 10.7178 2.8365C11.1734 3.29213 11.4294 3.91009 11.4294 4.55445C11.4294 5.19881 11.1734 5.81677 10.7178 6.2724C10.2622 6.72803 9.64419 6.984 8.99984 6.984C8.35536 6.984 7.73728 6.72798 7.28157 6.27227C6.82585 5.81656 6.56984 5.19848 6.56984 4.554Z"
                    fill="#4E4B66"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_19612_417">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="flex bg-gray-200 py-[5px] px-[20px] rounded-[5px] w-55 flex justify-center">
                <select
                  name="location"
                  id="location"
                  value={selectedLocation}
                  onChange={locationHandle}
                  className="bg-gray-200 outline-none"
                >
                  <option value="0">All</option>
                  <option value="1">Purwokerto</option>
                  <option value="2">Jakarta</option>
                  <option value="3">Bogor</option>
                  <option value="4">Bandung</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              className="bg-[var(--color--primary)] text-white px-[50px] py-[10px] rounded-[7px] mt-10"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>
        <div className="flex gap-[40px]">
          <span>Choose Cinema</span>
          <span className="text-gray-500">{schedules.length} Result</span>
        </div>

        {!isFiltered ? (
          // sebelum filter, tampil semua logo
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-[10px]">
            {cinemaLogos.map((c) => (
              <div
                key={c.name}
                className={`p-[20px] border rounded-md flex items-center justify-center min-h-[100px]
          ${
            c.name.toLowerCase() === "hiflix"
              ? "bg-[var(--color--primary)] text-white"
              : "bg-white"
          }`}
              >
                {c.svg}
              </div>
            ))}
          </div>
        ) : loadingSchedules ? (
          <p className="mt-5 text-center">Loading schedules...</p>
        ) : (
          // setelah filter, tampil logo hasil schedules
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-[10px]">
            {schedules.map((sch) => {
              const logo = cinemaLogos.find(
                (c) => c.name.toLowerCase() === sch.cinema.toLowerCase()
              )?.svg;
              return (
                <div
                  key={sch.id}
                  onClick={() => {
                    handleCinemaClick(sch.cinema);
                    dispatch(setScheduleId(sch.id)); // simpan id schedule ke Redux
                    dispatch(setCinema({ name: sch.cinema, price: sch.price }));
                    dispatch(
                      setScheduleDate(
                        new Date(sch.date).toISOString().split("T")[0]
                      )
                    );
                    dispatch(setScheduleTime(sch.time));
                  }}
                  className={`p-[20px] border cursor-pointer rounded-md flex items-center justify-center min-h-[100px]
    ${
      selectedCinema === sch.cinema
        ? "bg-blue-400 text-white" // semua yang dipilih → biru muda
        : sch.cinema.toLowerCase() === "hiflix"
        ? "bg-[var(--color--primary)] text-white" // default khusus hiflix → biru tua
        : "bg-white" // lainnya default → putih
    }`}
                >
                  {logo}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center items-center gap-[15px] my-[20px]">
          <div className="bg-[var(--color--primary)] text-white py-[10px] px-[20px] rounded-[5px]">
            1
          </div>
          <div className="border-[1px] text-[var(--color--primary)] py-[10px] px-[20px] rounded-[5px]">
            2
          </div>
          <div className="border-[1px] text-[var(--color--primary)] py-[10px] px-[20px] rounded-[5px]">
            3
          </div>
          <div className="border-[1px] text-[var(--color--primary)] py-[10px] px-[20px] rounded-[5px]">
            4
          </div>
        </div>

        <div className="flex justify-center my-[20px]">
          <Link
            className="bg-[var(--color--primary)] text-white py-[10px] px-[20px] rounded-[5px]"
            to={`/ticketing/movies/${movie.id}/order`}
          >
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default MovieDetail;
