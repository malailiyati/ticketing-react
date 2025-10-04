import React, { useEffect, useState } from "react";
import pen from "../assets/pen.png";
import eye from "../assets/eye.svg";
import delate from "../assets/Delete.svg";
// import useMoviesList from "../hooks/MoviesList";
import { Link, useNavigate } from "react-router";

const genreMap = {
  9: "Mystery",
  16: "Crime",
  4: "Thriller",
  5: "Science Fiction",
  1: "Animation",
  17: "Comedy",
  44: "Music",
  3: "Fantasy",
  46: "Family",
  2: "Action",
  50: "History",
  34: "Drama",
  13: "Adventure",
  53: "War",
  7: "Horror",
};

function MovieAdmin() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false); // modal konfirmasi
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // ambil data dari BE
  useEffect(() => {
    async function fetchMovies() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_BE_HOST}/admin/movies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        setMovies(data.data); // sesuaikan dgn response BE
      } catch (err) {
        setError(err.message || "Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const getPosterUrl = (poster) => {
    if (!poster) return "https://via.placeholder.com/300x450?text=No+Image";

    if (poster.startsWith("http")) {
      return poster; // URL dari TMDB
    }

    return `${import.meta.env.VITE_BE_HOST}/img/${poster}`; // path dari backend local
  };

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  useEffect(() => {
    if (showConfirm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showConfirm]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BE_HOST}/admin/movies/${deleteId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error(`Gagal hapus: ${res.status}`);

      setMovies((prev) => prev.filter((movie) => movie.id !== deleteId));
      setMessage("Movie berhasil dihapus");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.message || "Gagal hapus movie");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="bg-[#a0a3bd33] p-25">
      <div className="bg-white p-6 rounded shadow-md mx-auto pb-15">
        <div className="flex justify-between">
          <h1 className="font-bold text-[20px]">List Movie</h1>

          {/* Pesan ditengah sebagai <p> */}
          {message && <p className="text-green-500 font-medium">{message}</p>}
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
                      src={getPosterUrl(movie.poster)}
                      alt="poster movie"
                      className="max-h-20 py-2"
                    />
                  </td>
                  <td className="py-2 px-4">{movie.title}</td>
                  <td className="py-2 px-4">
                    {Array.isArray(movie.genres)
                      ? movie.genres
                          .map((id) => genreMap[Number(id)] || id)
                          .join(", ")
                      : movie.genres}
                  </td>

                  <td className="py-2 px-4">
                    {movie.release_date
                      ? new Date(movie.release_date).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </td>
                  <td className="py-2 px-4">{movie.duration}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center items-center gap-3 py-2">
                      <div className="bg-[var(--color--primary)] rounded py-1 px-2 min-h-7 min-w-7 flex justify-center items-center">
                        <img src={eye} alt="eye" />
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/ticketing/editMovie/${movie.id}`)
                        }
                        className="bg-[var(--color--primary)] rounded py-2 px-2 flex justify-center items-center"
                      >
                        <img className="h-3 w-4" src={pen} alt="pen" />
                      </button>
                      <button
                        onClick={() => handleDeleteConfirm(movie.id)}
                        className="bg-red-600 rounded py-2 px-2 flex justify-center items-center"
                      >
                        <img src={delate} alt="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Konfirmasi */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-hidden">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
              <p className="mb-6">Yakin ingin menghapus movie ini?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-red-600 text-white"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <div className="flex justify-center items-center gap-[15px] my-[20px]">
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
        </div> */}
      </div>
    </main>
  );
}

export default MovieAdmin;
