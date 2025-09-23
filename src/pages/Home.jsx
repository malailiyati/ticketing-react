// import React, { useEffect, useState } from "react";
import movie1 from "../assets/ba6c85426b9695a38b785c873d1dea010d4df1e7.png";
import lionKing from "../assets/lion king.png";
import spidermen from "../assets/spidermen.png";
import roblox from "../assets/roblox.jpg";
import { Link } from "react-router";
import React, { useRef } from "react";
import useMoviesList from "../hooks/MoviesList";

function Home() {
  const scrollRef = useRef(null);
  const {
    movies: moviesPopular,
    loading: loadingPopular,
    error: errorPopular,
  } = useMoviesList({ limit: 4, endpoint: "/movie/popular" });
  const {
    movies: moviesUpcoming,
    loading: loadingUpcoming,
    error: errorUpcoming,
  } = useMoviesList({ limit: 6, endpoint: "/movie/upcoming" });

  const getPosterUrl = (poster) => {
    if (!poster) return "https://via.placeholder.com/300x450?text=No+Image";

    if (poster.startsWith("http")) {
      return poster; // URL dari TMDB
    }

    return `${import.meta.env.VITE_BE_HOST}/img/${poster}`; // path dari backend local
  };
  // scroll kiri dan kanan
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  return (
    <>
      {/* Hero Section */}
      <section>
        <div className="flex flex-col gap-17 md:flex-row justify-between items-center mx-[70px] mt-40 mb-30 md:my-[200px]">
          <div className="text-center md:text-start">
            <h1 className="text-[var(--color--primary)] font-semibold text-[30px]">
              MOVIE TICKET PURCHASES #1 IN INDONESIA
            </h1>
            <p className="text-[48px] leading-[70px] py-[10px]">
              Experience the Magic of Cinema: Book Your Tickets Today
            </p>
            <p className="text-[16px] text-[var(--color--secundery)]">
              Sign up and get the ticket with a lot of discount
            </p>
          </div>
          {/* <div className="grid w-[450px] h-[10px] md:h-[250px] grid-cols-2 grid-rows-3 gap-[5px] overflow-hidden rounded-[7px]"> */}
          <div className="grid w-[350px] h-[350px] md:h-[300px] md:w-[450px] grid-cols-2 grid-rows-3 gap-[5px] overflow-hidden rounded-[7px]">
            {/* A */}
            <img
              src={movie1}
              alt="movie1"
              className="col-start-1 row-start-1 w-full h-full object-cover object-top"
            />

            {/* B */}
            <img
              src={lionKing}
              alt="lion king"
              className="col-start-2 row-start-1 row-span-2 w-full h-full object-cover object-top"
            />

            {/* C */}
            <img
              src={spidermen}
              alt="spidermen"
              className="col-start-1 row-start-2 row-span-2 w-full h-full object-cover object-top"
            />

            {/* D */}
            <img
              src={roblox}
              alt="roblox"
              className="col-start-2 row-start-3 w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="text-center md:text-start md:flex-row">
        <div className="px-[70px] py-[20px]">
          <h2 className="text-[var(--color--primary)] mb-[10px] font-semibold text-[25px]">
            WHY CHOOSE US
          </h2>
          <p className="text-[32px] leading-[40px] tracking-[1px]">
            Unleashing the Ultimate Movie <br />
            Experience
          </p>
          <div className="my-[50px] flex flex-col justify-between items-center md:flex-row gap-[50px]">
            <div className="md:max-w-[250px]">
              <div className="inline-block  bg-[#eeefff] w-[75px] h-[75px] p-[22px] flex items-center justify-center rounded-full mb-3">
                <svg
                  className="w-8 h-8"
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.7281 19.9137C8.83884 19.9715 8.96266 20.0009 9.08649 20C9.21032 19.999 9.33314 19.9686 9.44489 19.9097L13.0128 18.0025C14.0245 17.4631 14.8168 16.8601 15.435 16.1579C16.779 14.6282 17.5129 12.6758 17.4998 10.6626L17.4575 4.02198C17.4535 3.25711 16.9511 2.57461 16.2082 2.32652L9.57073 0.0995642C9.17106 -0.0357592 8.73313 -0.0328174 8.3405 0.106428L1.72824 2.41281C0.989299 2.67071 0.495998 3.35811 0.500024 4.12397L0.542307 10.7597C0.555395 12.7758 1.31448 14.7194 2.68062 16.2335C3.3048 16.9258 4.10415 17.52 5.12699 18.0505L8.7281 19.9137ZM7.78357 12.1089C7.93257 12.2521 8.12586 12.3227 8.31916 12.3207C8.51245 12.3198 8.70474 12.2472 8.85172 12.1021L12.7508 8.2581C13.0438 7.96882 13.0408 7.50401 12.7448 7.21866C12.4478 6.9333 11.9696 6.93526 11.6766 7.22454L8.30808 10.5449L6.92885 9.21909C6.63186 8.93373 6.15467 8.93667 5.8607 9.22595C5.56774 9.51523 5.57076 9.98004 5.86775 10.2654L7.78357 12.1089Z"
                    fill="#1D4ED8"
                  />
                </svg>
              </div>
              <h2 className="my-[40px] mb-[30px] text-[19px] font-semibold">
                Guaranteed
              </h2>
              <p className="text-[15px] leading-[20px] text-[var(--color--secundery)]">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>
            <div className="md:max-w-[250px]">
              <div className="inline-block bg-[#eeefff] w-[75px] h-[75px] p-[22px] flex items-center justify-center rounded-full mb-3">
                <svg
                  className="w-8 h-8"
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_16_9253)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2002 21C16.9992 21 21.7002 16.299 21.7002 10.5C21.7002 4.70101 16.9992 0 11.2002 0C5.4012 0 0.700195 4.70101 0.700195 10.5C0.700195 16.299 5.4012 21 11.2002 21ZM16.1618 8.24293C16.5463 7.85852 16.5463 7.23523 16.1618 6.85082C15.7774 6.4664 15.1542 6.4664 14.7698 6.85082L9.55957 12.061L7.63063 10.1321C7.24621 9.74765 6.62293 9.74765 6.23851 10.1321C5.85409 10.5165 5.85409 11.1398 6.23851 11.5242L8.86351 14.1491C9.24793 14.5336 9.87121 14.5336 10.2556 14.1491L16.1618 8.24293Z"
                      fill="#1D4ED8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_16_9253">
                      <rect
                        width="21"
                        height="21"
                        fill="white"
                        transform="translate(0.700195)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <h2 className="my-[40px] mb-[30px] text-[19px] font-semibold">
                Affordable
              </h2>
              <p className="text-[15px] leading-[20px] text-[var(--color--secundery)]">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>
            <div className="md:max-w-[250px]">
              <div className="inline-block bg-[#eeefff] w-[75px] h-[75px] p-[22px] flex items-center justify-center rounded-full mb-3">
                <svg
                  className="w-8 h-8"
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.52518 0C1.13633 0 0 1.04375 0 2.31945V16.2362L3.78776 12.757H15.1511C16.5399 12.757 17.6762 11.7132 17.6762 10.4375V2.31945C17.6762 1.04375 16.5399 0 15.1511 0H2.52518ZM20.2014 5.79863V10.4375C20.2014 12.9959 17.9363 15.0764 15.1511 15.0764H7.57553V16.2362C7.57553 17.5119 8.71186 18.5556 10.1007 18.5556H21.464L25.2518 22.0348V8.11808C25.2518 6.84238 24.1154 5.79863 22.7266 5.79863H20.2014Z"
                    fill="#1D4ED8"
                  />
                </svg>
              </div>

              <h2 className="my-[40px] mb-[30px] text-[19px] font-semibold">
                24/7 Customer Support
              </h2>
              <p className="text-[15px] leading-[20px] text-[var(--color--secundery)]">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Section */}
      <section className="py-12 px-6 bg-white">
        <div className="p-[70px]">
          <h2 className="text-[var(--color--primary)] mb-[10px] font-semibold text-[25px] text-center">
            MOVIES
          </h2>
          <p className="text-[32px] leading-[40px] tracking-[1px] text-center">
            Exciting Movies That Should <br /> Be Watched Today
          </p>

          <section className="mt-10 flex gap-6 overflow-x-scroll">
            {loadingPopular && <p>Loading popular...</p>}
            {errorPopular && <p>Gagal load popular movies</p>}
            {!loadingPopular &&
              !errorPopular &&
              moviesPopular.map((movie) => (
                // {moviesPopular.map((movie) => (
                <div
                  key={movie.id}
                  className="group bg-white min-w-[250px] rounded-[12px] shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={getPosterUrl(movie.poster)}
                      alt={movie.title}
                      className="w-full min-h-[350px] object-cover rounded-[8px]"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-[8px]">
                      <Link
                        to={`/ticketing/movies/${movie.id}`}
                        className="min-w-[180px] py-3 text-sm text-white text-center border border-white bg-white/10 rounded-[6px] hover:bg-white/30"
                      >
                        Details
                      </Link>
                      <Link
                        to="#"
                        className="min-w-[180px] py-3 text-sm text-white text-center bg-[var(--color)] rounded-[6px] hover:bg-[#163899]"
                      >
                        Ticket
                      </Link>
                    </div>
                  </div>
                  <Link to={`/ticketing/movies/${movie.id}`}>
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

          <div className="mt-8 text-center">
            <Link
              to="/ticketing/movies"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              View All
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 10L2.5 10"
                  stroke="#1D4ED8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 5L17.5 10L12.5 15"
                  stroke="#1D4ED8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="py-12 px-6 bg-white">
        <div className="p-[70px] flex justify-between items-center mb-6">
          <div>
            <h2 className="text-[var(--color--primary)] mb-[10px] font-semibold text-[25px]">
              UPCOMING MOVIES
            </h2>
            <p className="text-[32px] leading-[40px] tracking-[1px]">
              Exciting Movie Coming Soon
            </p>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => scroll("left")}
              className="material-symbols-outlined cursor-pointer select-none bg-blue-700 text-white p-3 rounded-full hover:bg-blue-400"
              aria-label="Scroll Left"
              type="button"
            >
              arrow_back
            </button>
            <button
              onClick={() => scroll("right")}
              className="material-symbols-outlined cursor-pointer select-none bg-blue-700 text-white p-3 rounded-full hover:bg-blue-400"
              aria-label="Scroll Right"
              type="button"
            >
              arrow_forward
            </button>
          </div>
        </div>

        <section
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-6 mx-10"
          style={{ scrollBehavior: "smooth" }}
        >
          {loadingUpcoming && <p>Loading upcoming...</p>}
          {errorUpcoming && <p>Gagal load upcoming movies</p>}
          {!loadingUpcoming &&
            !errorUpcoming &&
            moviesUpcoming.map((movie) => (
              // {moviesUpcoming.map((movie) => (
              <div
                key={movie.id}
                className="group bg-white min-w-[250px] rounded-[12px] shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={getPosterUrl(movie.poster)}
                    alt={movie.title}
                    className="w-full min-h-[350px] object-cover rounded-[8px]"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-[8px]">
                    <Link
                      to={`/ticketing/movies/${movie.id}`}
                      className="min-w-[180px] py-3 text-sm text-white text-center border border-white bg-white/10 rounded-[6px] hover:bg-white/30"
                    >
                      Details
                    </Link>
                    <Link
                      to="#"
                      className="min-w-[180px] py-3 text-sm text-white text-center bg-[var(--color)] rounded-[6px] hover:bg-[#163899]"
                    >
                      Ticket
                    </Link>
                  </div>
                </div>
                <Link to={`/ticketing/movies/${movie.id}`}>
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
      </section>
    </>
  );
}

export default Home;
