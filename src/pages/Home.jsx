import React from "react";
import movie1 from "../assets/ba6c85426b9695a38b785c873d1dea010d4df1e7.png";
import lionKing from "../assets/lion king.png";
import spidermen from "../assets/spidermen.png";
import roblox from "../assets/roblox.jpg";
import blackWidow from "../assets/black widow.png";
import theWitches from "../assets/the witches.png";
import tenet from "../assets/tenet.png";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex justify-between align-center my-[100px]">
        <div>
          <div>
            <h1>MOVIE TICKET PURCHASES #1 IN INDONESIA</h1>
            <p>Experience the Magic of Cinema: Book Your Tickets Today</p>
            <p>Sign up and get the ticket with a lot of discount</p>
          </div>
          <div className="w-[350px] h-[350px] grid grid-cols-2 gap-4">
            <img src={movie1} alt="movie1" className="w-32 h-auto rounded" />
            <img
              src={lionKing}
              alt="lion king"
              className="w-32 h-auto rounded"
            />
            <img
              src={spidermen}
              alt="spidermen"
              className="w-32 h-auto rounded"
            />
            <img src={roblox} alt="roblox" className="w-32 h-auto rounded" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">WHY CHOOSE US</h2>
          <p className="text-gray-600 mb-8">
            Unleashing the Ultimate Movie <br /> Experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {["Guaranteed", "Affordable", "24/7 Customer Support"].map(
              (title, idx) => (
                <div key={idx} className="p-4 bg-white rounded shadow-sm">
                  <div className="mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipis elit. Sit
                    enim nec, proin faucibus nibh et sagittis a. Lacinia purus
                    ac amet.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Movie Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">MOVIES</h2>
          <p className="text-gray-600 mb-8">
            Exciting Movies That Should <br /> Be Watched Today
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Black Widow",
                genres: ["Action", "Adventure"],
                img: blackWidow,
              },
              {
                title: "The Witches",
                genres: ["Comedy", "Adventure"],
                img: theWitches,
              },
              {
                title: "Tenet",
                genres: ["Action", "Scfi-Fi"],
                img: tenet,
              },
              {
                title: "Spiderman",
                genres: ["Action", "Adventure"],
                img: spidermen,
              },
            ].map((movie, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded-lg relative group"
              >
                <div className="relative overflow-hidden rounded">
                  <img src={movie.img} alt={movie.title} className="w-full" />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex-col justify-center items-center gap-2 hidden group-hover:flex">
                    <a href="#" className="text-white underline">
                      Details
                    </a>
                    <a href="#" className="text-white font-semibold">
                      Ticket
                    </a>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{movie.title}</h3>
                <div className="flex gap-2 text-xs mt-1 text-gray-600">
                  {movie.genres.map((g, i) => (
                    <span key={i}>{g}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <a
              href="../movie/movie.html"
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
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">UPCOMING MOVIES</h2>
              <p className="text-gray-600">Exciting Movie Coming Soon</p>
            </div>
            <div className="flex gap-2">
              <span className="material-symbols-outlined cursor-pointer">
                arrow_back
              </span>
              <span className="material-symbols-outlined cursor-pointer">
                arrow_forward
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Black Widow",
                month: "December 2024",
                img: blackWidow,
                genres: ["Action", "Adventure"],
              },
              {
                title: "The Witches",
                month: "Januari 2024",
                img: theWitches,
                genres: ["Comedy", "Adventure"],
              },
              {
                title: "Tenet",
                month: "June 2024",
                img: tenet,
                genres: ["Action", "Scfi-Fi"],
              },
              {
                title: "Spiderman",
                month: "March 2024",
                img: spidermen,
                genres: ["Action", "Adventure"],
              },
            ].map((movie, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full rounded"
                />
                <h3 className="mt-3 text-lg font-semibold">{movie.title}</h3>
                <span className="text-sm text-gray-500">{movie.month}</span>
                <div className="flex gap-2 text-xs mt-1 text-gray-600">
                  {movie.genres.map((g, i) => (
                    <span key={i}>{g}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
