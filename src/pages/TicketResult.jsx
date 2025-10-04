import React, { useContext } from "react";
import logo from "../assets/logo-tickitz.png";
import barcode from "../assets/barcode.png";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { historyContext } from "../context/ticket/historyContext";
import { clearDataMovie } from "../../redux/slices/orderSlice";

function TicketResult() {
  const dispatch = useDispatch();
  const { selectedSeats, totalPrice, selectedDate, selectedTime, movieTitle } =
    useSelector((state) => state.order);

  const numberOfTicket = selectedSeats.length;

  const { addHistory } = useContext(historyContext);
  const handleDone = () => {
    const order = {
      selectedSeats,
      totalPrice,
      selectedDate,
      selectedTime,
      movieTitle,
      numberOfTicket,
    };
    addHistory(order);
    dispatch(clearDataMovie());
  };
  return (
    <main className="flex md:flex-row flex-col my-20 bg-[#a0a3bd33]">
      <section className="flex-1">
        <div className="relative bg-overlay-img h-200 bg-center bg-no-repeat bg-cover text-sm text-white w-190">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 p-25">
            <img src={logo} alt="background poster" className="w-70" />

            <p className="text-4xl font-bold my-5">Thankyou For Purchasing</p>
            <p className="text-2xl text-[var(--color--secundery)]">
              Lorem ipsum dolor sit amet consectetur. Quam pretium pretium
              tempor integer sed magna et.
            </p>
            <div className="flex gap-5 font-bold my-5">
              <p className="text-lg">Please Download Your Ticket</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.48 11.5203H21.4013L18.3806 8.49969L19.0594 7.82097L23.2387 12.0003L19.0594 16.1797L18.3806 15.501L21.4013 12.4803H0.48V11.5203Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mx-20 my-20 md:my-1">
        <div className="bg-white rounded-2xl relative overflow-hidden">
          <div className="mx-15 mb-20 mt-10 border-b-2 border-dashed border-[var(--color--secundery)] flex justify-center">
            <img src={barcode} alt="barcode" className="w-50 mb-10" />
          </div>

          <div className="flex justify-between gap-20 mx-10">
            <div>
              <dl>
                <div>
                  <dt className="text-[var(--color--secundery)]">Movie</dt>
                  <dd>{movieTitle}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color--secundery)]">Date</dt>
                  <dd>{selectedDate}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color--secundery)]">Count</dt>
                  <dd>{numberOfTicket}</dd>
                </div>
              </dl>
            </div>
            <div>
              <dl>
                <div>
                  <dt className="text-[var(--color--secundery)]">Category</dt>
                  <dd>PG-13</dd>
                </div>
                <div>
                  <dt className="text-[var(--color--secundery)]">Time</dt>
                  <dd>{selectedTime}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color--secundery)]">seats</dt>
                  <dd className="flex gap-2 flex-wrap">
                    {selectedSeats.map((seat) => (
                      <span>{seat}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <dl className="flex justify-between items-center border-1 border-[var(--color--secundery)] rounded-xl py-3 px-5 mx-10 my-5">
              <dt>Total</dt>
              <dd> Rp {totalPrice.toLocaleString("id-ID")}</dd>
            </dl>
          </div>
          <div>
            <div className="absolute bg-[#a0a3bd33] w-22 h-22 rounded-full top-60 -right-12"></div>
            <div className="absolute bg-[#a0a3bd33] w-22 h-22 rounded-full top-60 -left-12"></div>
          </div>
        </div>

        <div className="my-5">
          <div className="flex justify-center items-center gap-5 border border-[var(--color--primary)] rounded-md px-30 py-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                stroke="#1D4ED8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 10L12 15L17 10"
                stroke="#1D4ED8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 15V3"
                stroke="#1D4ED8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Link href="" className="text-[var(--color--primary)]">
              Download
            </Link>
          </div>
          <div className="bg-[var(--color--primary)] text-white my-5 rounded-md px-30 py-3 text-center">
            <Link to="/ticketing/orderHistory" onClick={handleDone}>
              Done
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TicketResult;
