import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleSeat, setSeatMap } from "../../redux/slices/orderSlice";
import { useEffect, useState } from "react";
import { cinemaLogos } from "../constants/CinemaLogos";

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    selectedSeats,
    totalPrice,
    selectedDate,
    selectedTime,
    moviePoster,
    movieTitle,
    movieGenre,
    scheduleId,
    cinemaName,
    cinemaPrice,
  } = useSelector((state) => state.order);

  // const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const leftCols = [1, 2, 3, 4, 5, 6, 7];
  const rightCols = [8, 9, 10, 11, 12, 13, 14];
  // const [selectedSeats, setSelectedSeats] = useState([]);

  const [soldSeats, setSoldSeats] = useState([]);
  useEffect(() => {
    if (!scheduleId) {
      navigate("/ticketing/movies");
    }
  }, [scheduleId, navigate]);

  //  Fetch kursi sold dari BE
  useEffect(() => {
    const fetchSoldSeats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BE_HOST}/seats?schedule_id=${scheduleId}`
        );
        if (!res.ok) throw new Error("Failed to fetch sold seats");

        const data = await res.json();

        if (data && Array.isArray(data.data)) {
          setSoldSeats(data.data.map((s) => s.seat_number));

          // Buat mapping seat_number -> id
          const mapping = {};
          data.data.forEach((seat) => {
            mapping[seat.seat_number] = seat.id;
          });
          setSeatMap(mapping);
          dispatch(setSeatMap(mapping));
        } else {
          setSoldSeats([]);
          setSeatMap({});
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setSoldSeats([]);
        setSeatMap({});
      }
    };

    if (scheduleId) fetchSoldSeats();
  }, [scheduleId, dispatch]);

  //  Render kursi (bedakan available/selected/sold)
  const renderSeatGrid = (cols) => {
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-rows-7 gap-2">
          {rows.map((row) => (
            <div key={row} className="grid grid-cols-7 gap-2">
              {cols.map((col) => {
                const seatId = `${row}${col}`;
                const isSelected = selectedSeats.includes(seatId);
                const isSold = soldSeats.includes(seatId);

                return (
                  <div
                    key={seatId}
                    onClick={() => {
                      if (!isSold) {
                        dispatch(toggleSeat(seatId));
                      }
                    }}
                    className={`w-8 h-8 rounded cursor-pointer flex items-center justify-center text-sm
                      ${
                        isSold
                          ? "bg-[#6e7191] cursor-not-allowed"
                          : isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 hover:bg-blue-300"
                      }`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[27px] mt-2">
          {cols.map((num) => (
            <div key={num} className="text-center text-sm gap-20">
              {num}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const selectedCinemaLogo = cinemaLogos.find(
    (c) => c.name.toLowerCase() === cinemaName?.toLowerCase()
  )?.svg;

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      return;
    }
    navigate("/ticketing/movies/payment");
  };

  return (
    <section className="bg-[#a0a3bd33]">
      <main>
        <div className="flex justify-center items-center gap-[20px] pt-30 pb-10">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center bg-[#008000] text-white w-[40px] h-[40px] rounded-full">
              <svg
                className="flex justify-center items-center"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12L10 17L20 7"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="label on">Dates and Time</div>
          </div>

          <div className="flex items-center gap-[3px]">
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[14px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center bg-[var(--color--primary)] text-white w-[40px] h-[40px] rounded-full">
              2
            </div>
            <div class="label">Seat</div>
          </div>

          <div className="flex items-center gap-[3px]">
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[14px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
            <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center bg-[var(--color--secundery)] text-white w-[40px] h-[40px] rounded-full">
              3
            </div>
            <div class="label">Payment</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:mx-[70px] md:items-start items-center relative md:gap-[30px] w-full md:w-auto">
          <section className="p-[30px] bg-white w-[90%] md:w-[60%] rounded-[10px] mb-[100px]">
            <div className="flex overflow-x-auto h-[155px] border-[1px] border-[var(--color--secundery)] my-[50px] py-[15px] px-[35px] gap-[30px]">
              <div>
                <img
                  className="w-[184px] h-[100%] object-top object-cover"
                  src={moviePoster}
                  alt="spiderman poster"
                />
              </div>
              <div>
                <h1>{movieTitle}</h1>
                <div className="flex gap-4 mt-3">
                  {movieGenre && movieGenre.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {movieGenre.map((genre, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-40 md:gap-20 mt-3">
                  <span>regular - {selectedTime}</span>
                  <Link
                    to="/ticketing/movies/"
                    className="bg-[var(--color--primary)] py-1 px-3 rounded text-white"
                  >
                    Change
                  </Link>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-2">Choose Your Seat</h2>
            <div className="text-center mb-4 font-medium text-gray-500">
              Screen
            </div>

            <div className="flex gap-10 justify-center transform scale-90 md:scale-100">
              <div className="grid grid-rows-7 gap-2">
                {rows.map((row) => (
                  <div
                    key={`label-${row}`}
                    className="w-5 text-center font-semibold"
                  >
                    {row}
                  </div>
                ))}
              </div>

              {renderSeatGrid(leftCols)}
              {renderSeatGrid(rightCols)}
            </div>
            <div>
              <h2>Seating key</h2>
              <div className="flex justify-between items-center">
                <div>Available</div>

                <div>
                  <div className="bg-[var(--color--primary)] p-3 md:p-[15px] rounded-[7px]"></div>
                  <div>Selected</div>
                </div>

                <div>
                  <div className="bg-[#f589d7] p-3 md:p-[15px] rounded-[7px]"></div>
                  <div>Love nest</div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div className="bg-[#6e7191] p-3 md:p-[15px] px-7 md:px-[35px] rounded-[7px]"></div>
                  <div>Sold</div>
                </div>
              </div>
            </div>
          </section>

          <aside>
            <div className="bg-white p-[30px] rounded-[10px] w-[450px]">
              <div className="flex flex-col items-center leanding-[5px] gap-3">
                <div className="h-12 w-28 flex items-center justify-center">
                  {selectedCinemaLogo}
                </div>
                <p className="text-[24px]">{cinemaName} Cinema</p>
              </div>

              <dl className="my-[25px] flex flex-col gap-3">
                <div className="flex justify-between text-[14px]">
                  <dt>Movie selected</dt>
                  <dd>{movieTitle}</dd>
                </div>

                <div className="flex justify-between text-[14px]">
                  <dt>{selectedDate}</dt>
                  <dd>{selectedTime}</dd>
                </div>

                <div className="flex justify-between text-[14px]">
                  <dt>One ticket price</dt>
                  <dd>Rp {cinemaPrice.toLocaleString("id-ID")}</dd>
                </div>

                <div className="flex justify-between text-[14px]">
                  <dt>Seat choosed</dt>
                  <dd>
                    {selectedSeats.length > 0
                      ? selectedSeats.join(", ")
                      : "None"}
                  </dd>
                </div>
              </dl>

              <hr />

              <dl className="flex justify-between text-[20px]">
                <dt>Total Payment</dt>
                <dd className="text-[var(--color--primary)]">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </dd>
              </dl>
            </div>
            <div
              onClick={handleProceed}
              className="bg-[var(--color--primary)] text-white my-[20px] py-[10px] px-[20px] rounded-[7px] mb-10 text-center cursor-pointer"
            >
              Checkout Now
            </div>
          </aside>
        </div>
      </main>
    </section>
  );
}

export default OrderPage;
