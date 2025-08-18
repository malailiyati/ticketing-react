import React from "react";
import pen from "../assets/pen.png";
import eye from "../assets/eye.svg";
import delate from "../assets/Delete.svg";
import useMoviesList from "../hooks/MoviesList";
import { Link } from "react-router";

function MovieAdmin() {
  const {
    movies: movies,
    loading: loading,
    error: error,
  } = useMoviesList({ limit: 6 });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <main className="bg-[#a0a3bd33] p-25">
      <div className="bg-white p-6 rounded shadow-md mx-auto">
        <div className="flex justify-between">
          <h1 className="font-bold text-[20px]">List Movie</h1>
          <div className="flex gap-7">
            <input
              type="date"
              id="date"
              className="flex bg-gray-200 py-[5px] px-[20px] rounded-[5px] w-50 flex justify-center"
            />
            <Link
              to="/ticketing/addMovie"
              className="bg-[var(--color--primary)] rounded py-1 px-5 text-white"
            >
              Add Movie
            </Link>
          </div>
        </div>
        <div className="overflow-x-scroll md:overflow-x-none">
          <table className="overflow-hidden my-5">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4 text-left">No</th>
                <th className="py-2 px-4">Thumbnail</th>
                <th className="py-2 px-4">MovieName</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Released Date</th>
                <th className="py-2 px-4">Duration</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>

            <tbody className="border-b">
              {movies.map((movie, index) => (
                <tr key={movie.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img
                      src={`${import.meta.env.VITE_PREFIX_IMAGE}${
                        movie.poster_path
                      }`}
                      alt="poster movie"
                      className="max-h-20 py-2"
                    />
                  </td>
                  <td className="py-2 px-4">{movie.title}</td>
                  <td className="py-2 px-4">p{movie.genres}</td>
                  <td className="py-2 px-4">{movie.release_date}</td>
                  <td className="py-2 px-4">1 jam</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center items-center gap-3 py-2">
                      <div className="bg-[var(--color--primary)] rounded py-1 px-2 min-h-7 min-w-7 flex justify-center items-center">
                        <img src={eye} alt="eye" />
                      </div>
                      <div className="bg-[var(--color--primary)] rounded py-1 px-2 min-h-7 min-w-7 flex justify-center items-center">
                        <img src={pen} alt="pen" />
                      </div>
                      <div className="bg-red-600 rounded py-1 px-2 min-h-7 min-w-7 flex justify-center items-center">
                        <img src={delate} alt="delete" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-[15px] my-[20px]">
          <div className="bg-[var(--color--primary)] text-white py-[7px] px-[15px] rounded-[5px]">
            1
          </div>
          <div className="border-[1px] text-[var(--color--primary)] py-[7px] px-[15px] rounded-[5px]">
            2
          </div>
          <div className="border-[1px] text-[var(--color--primary)] py-[7px] px-[15px] rounded-[5px]">
            3
          </div>
          <div className="border-[1px] text-[var(--color--primary)] py-[7px] px-[15px] rounded-[5px]">
            4
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieAdmin;
