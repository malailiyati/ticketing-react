import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

function AddMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    release_date: "",
    hour: "",
    minute: "",
    director_id: "", // langsung ID
    genres: "", // contoh input: "1,2,3"
    casts: "", // contoh input: "5,7"
  });

  const [poster, setPoster] = useState(null);
  const [bgPoster, setBgPoster] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e, type) => {
    if (type === "poster") setPoster(e.target.files[0]);
    if (type === "bgPoster") setBgPoster(e.target.files[0]);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("synopsis", form.synopsis);
      formData.append("release_date", form.release_date);

      const hh = String(form.hour || 0).padStart(2, "0");
      const mm = String(form.minute || 0).padStart(2, "0");
      formData.append("duration", `${hh}:${mm}:00`);

      formData.append("director_id", form.director_id);

      // genres → array
      form.genres.split(",").forEach((gid) => {
        if (gid.trim()) formData.append("genres", gid.trim());
      });

      // casts → array
      form.casts.split(",").forEach((cid) => {
        if (cid.trim()) formData.append("casts", cid.trim());
      });

      if (poster) formData.append("poster", poster);
      if (bgPoster) formData.append("background_poster", bgPoster);

      const res = await fetch(
        `${import.meta.env.VITE_BE_HOST}/admin/movies/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal update movie");

      setMessage("Movie berhasil diupdate");
      setTimeout(() => navigate("/ticketing/movieAdmin"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <main className="bg-[#a0a3bd33] p-25">
      <div className="bg-white p-6 rounded shadow-md mx-auto w-full md:w-2/3">
        <h1 className="font-bold mb-4 text-[20px]">Add New Movie</h1>

        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form className="py-3" onSubmit={handleSubmit}>
          <label>Movie Name *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />

          <label>Synopsis *</label>
          <textarea
            name="synopsis"
            value={form.synopsis}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded h-24"
          />

          <label>Release Date *</label>
          <input
            type="date"
            name="release_date"
            value={form.release_date}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />

          <label>Duration (hour/minute) *</label>
          <label>Duration (hour/minute) *</label>
          <div className="flex gap-3 mb-3">
            <input
              type="number"
              name="hour"
              value={form.hour}
              onChange={handleChange}
              placeholder="2"
              min="0"
              max="23"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="number"
              name="minute"
              value={form.minute}
              onChange={handleChange}
              placeholder="13"
              min="0"
              max="59"
              className="border p-2 rounded w-1/2"
            />
          </div>

          <label>Director ID *</label>
          <input
            type="number"
            name="director_id"
            value={form.director_id}
            onChange={handleChange}
            placeholder="1"
            className="border p-2 w-full mb-3 rounded"
          />

          <label>Genres (IDs, comma separated)</label>
          <input
            type="text"
            name="genres"
            value={form.genres}
            onChange={handleChange}
            placeholder="1,2,3"
            className="border p-2 w-full mb-3 rounded"
          />

          <label>Casts (IDs, comma separated)</label>
          <input
            type="text"
            name="casts"
            value={form.casts}
            onChange={handleChange}
            placeholder="5,7"
            className="border p-2 w-full mb-3 rounded"
          />

          <div className="flex flex-col">
            <label>Poster *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "poster")}
              className="mb-3"
            />

            <label>Background Poster</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "bgPoster")}
              className="mb-3"
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color--primary)] text-white py-2 w-full rounded cursor-pointer"
          >
            Save Movie
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddMovie;
