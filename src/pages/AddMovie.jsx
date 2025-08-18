import React from "react";

function AddMovie() {
  return (
    <main className="bg-[#a0a3bd33] p-25">
      <div className="bg-white p-6 rounded shadow-md mx-auto w-full md:w-2/3">
        <h1 className="font-bold mb-2 text-[20px]">Add New Movie</h1>
        <p className="text-gray-500 ">Upload Image</p>
        <button className="text-white bg-[var(--color--primary)] py-1 px-3 rounded my-1 cursor-pointer">
          Upload
        </button>

        <form className="py-3">
          <div>
            <label htmlFor="movieName">Movie Name</label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              placeholder="Spider-Man:Homecoming"
              className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
            />
          </div>

          <div className="my-5">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Action, Adventure, Sci-Fi"
              className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
            />
          </div>

          <div className="flex justify-between gap-10">
            <div>
              <label htmlFor="relesedate">Relase date</label>
              <input
                type="text"
                id="releseDate"
                name="relesedate"
                placeholder="07/05/2020"
                className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
              />
            </div>

            <div>
              <label htmlFor="hour">Duration(hour/minute)</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="hour"
                  name="hour"
                  placeholder="2"
                  className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
                />
                <input
                  type="text"
                  id="minute"
                  name="minute"
                  placeholder="13"
                  className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
                />
              </div>
            </div>
          </div>

          <div className="my-5">
            <label htmlFor="directorName">Director Name</label>
            <input
              type="text"
              id="directorName"
              name="directoreName"
              placeholder="Jon Watts"
              className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
            />
          </div>

          <div>
            <label htmlFor="cast">Cast</label>
            <input
              type="text"
              id="cast"
              name="cast"
              placeholder="Tom Holland, Michael Keaton, Robert Dow.."
              className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
            />
          </div>

          <div className="my-5">
            <label htmlFor="synopsis">Synopsis</label>

            <textarea
              name="synopsis"
              id="synopsis"
              className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2 h-50"
              placeholder="Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, |"
            ></textarea>
          </div>

          <div>
            <label htmlFor="location">Add Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Purwokerto, Bandung, Bekasi"
              className="bg-gray-50 border border-gray-400 py-2 px-5 rounded w-full mt-2"
            />
          </div>

          <div className="my-5">
            <label htmlFor="date">Set Date & Time</label> <br />
            <input
              type="date"
              id="date"
              name="date"
              className="bg-gray-50 border border-gray-400 py-2 px-5 rounded mt-2 mb-4"
            />
            <div className="flex gap-5 items-center">
              <p className="text-[var(--color--primary)] border border-[var(--color--primary)] rounded py-1 px-3">
                +
              </p>
              <p>08:30am</p>
              <p>10:30pm</p>
            </div>
          </div>

          <button className="bg-[var(--color--primary)] text-white py-1 w-full text-center rounded cursor-pointer">
            Save Movie
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddMovie;
