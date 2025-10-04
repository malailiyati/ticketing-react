import React, { useState, useEffect } from "react";
import InfoAccount from "../components/InfoAccount";
import AccountSetting from "../components/AccountSetting";
// import { useSelector } from "react-redux";
import barcode from "../assets/barcode.png";
// import { historyContext } from "../context/ticket/historyContext";
import { useSelector } from "react-redux";

function OrderHistory() {
  const [history, setHistory] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const toggleDetails = (index) => {
    if (showDetails.includes(index)) {
      setShowDetails(showDetails.filter((i) => i !== index));
    } else {
      setShowDetails([...showDetails, index]);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BE_HOST}/user/history`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();

        // kalau response array langsung
        const historyData = Array.isArray(data) ? data : data.data || [];

        setHistory(
          historyData.map((item) => ({
            movieTitle: item.movie_title,
            shortMovieTitle: item.movie_title
              ? item.movie_title.split(" ").slice(0, 2).join(" ") + "..." // ambil 2 kata pertama
              : "",
            selectedDate: item.date ? item.date.split("T")[0] : "",
            selectedTime: item.time,
            selectedSeats: item.seats ? item.seats.split(",") : [],
            totalPrice: item.total_price,
            numberOfTicket: item.seats ? item.seats.split(",").length : 0,
            cinemaName: item.cinema_name,
            isPaid: item.is_paid,
          }))
        );
      } catch (err) {
        console.error("Error fetch order history:", err);
      }
    };

    fetchHistory(); // cuma fetch kalau ada token
  }, [token]);

  return (
    <main className="bg-[#a0a3bd33] p-25">
      <div className="flex gap-10 flex-col md:flex-row">
        <div>
          <InfoAccount />
        </div>

        <div>
          <AccountSetting />

          {history.map((order, index) => (
            <div key={index}>
              <div className="px-5 py-3 bg-white rounded-[20px] mt-15">
                <div className="flex justify-between items-center border-b border-[var(--color--secundery)] w-ful">
                  <div className="mb-8 gap-5">
                    <p className="text-[var(--color--secundery)] mb-3 my-5">
                      {order.selectedDate} - {order.selectedTime}
                    </p>
                    <h2 className="text-xl font-semibold">
                      {order.movieTitle}
                    </h2>
                  </div>
                  <div>
                    <svg
                      width="160"
                      height="64"
                      viewBox="0 0 160 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.4517 51.7551C31.0706 51.7551 34.4872 49.9736 37.0721 48.1921C38.5557 47.1455 39.9493 45.9653 41.2755 44.607L38.3759 41.623C36.0382 43.8721 31.4078 47.0341 27.8113 47.0341C26.6649 47.0341 25.9007 46.6334 24.9791 45.0077C30.2164 43.5826 34.0826 39.6411 34.0826 35.9669C34.0826 32.6044 31.5202 30.3998 28.171 30.3998C22.012 30.3998 19 37.4366 19 42.4692C19 47.3904 21.8097 51.7551 27.4517 51.7551ZM24.4621 41.289C24.4621 39.3071 24.8218 34.653 28.6655 34.653C29.3847 34.653 29.9467 35.6106 29.9467 36.9467C29.9467 38.8172 26.5975 41.289 24.4621 41.289ZM44.9694 33.5842C49.1503 28.5515 53.8706 21.9601 53.8706 16.3263C53.8706 12.2957 53.1738 9 48.6108 9C42.5193 9 38.9453 25.0109 37.5067 33.7401C36.7874 38.1046 36.4053 41.6898 36.1581 44.2952C36.0232 45.8094 35.9333 47.1678 35.8884 48.3703C36.9673 49.0161 38.0911 49.5727 39.2825 50.0627C41.3279 50.9311 43.9354 51.7551 46.4754 51.7551H47.0374C47.5993 51.5324 48.1387 51.3096 48.6332 51.0647C49.5099 50.6416 50.4764 50.1295 50.9935 49.6173C55.2192 48.6598 58.3436 47.346 61.6479 44.3843L59.9171 40.71C57.5345 43.0705 55.3316 44.0725 53.1513 45.3418C54.927 42.625 55.3092 40.3092 55.3092 37.303C55.3092 33.6955 53.2188 30.3775 49.7122 30.3775C48.341 30.3775 47.0148 31.7581 45.329 33.8291L44.9694 33.5842ZM47.352 35.4547C49.7122 35.4547 50.2742 36.7686 50.2742 38.2382C50.2742 41.6453 48.9704 47.4796 45.8685 47.4796C44.9918 47.4796 44.0028 47.3014 43.1262 47.1233C42.6317 47.0119 42.1372 46.9006 41.6427 46.7447C41.6876 46.2325 41.7326 45.6759 41.8 45.0746C41.9124 44.028 42.0922 42.6696 42.362 41.0663C43.0138 37.1025 45.2616 35.4547 47.352 35.4547ZM49.5549 15.057C49.1053 21.3811 44.812 27.1487 42.362 31.8249C43.0813 27.9057 45.9359 13.2755 48.4084 13.2755C49.4199 13.2755 49.5549 14.812 49.5549 15.057ZM59.9246 45.2527C60.1045 48.0808 60.1494 52 63.6334 52C65.7239 52 68.5336 47.7245 70.2868 44.1393C70.3543 46.3661 72.2874 48.5262 75.5017 48.5262C77.4123 48.5262 79.6152 47.7245 81.5932 46.4775V41.2444C80.9413 41.6675 80.312 42.0684 79.705 42.4023C78.6486 43.0037 77.3674 43.5381 76.4682 43.5381C74.0407 43.5381 73.4338 42.0906 73.4338 40.6654C73.4338 39.9752 73.5462 39.3294 73.7035 38.8172C73.771 38.5277 73.8608 38.2605 73.9732 37.9933C75.2994 35.0761 76.2435 33.8737 76.2435 32.2481C76.2435 31.1569 75.0972 30.3775 73.3664 30.3775C72.0626 30.3775 70.9387 31.1347 70.7589 31.9586L64.8473 45.9208L64.5325 45.943L65.4092 31.8473C65.3867 31.0679 64.8023 30.3775 63.7908 30.3775C63.6334 30.3775 63.521 30.3998 63.3637 30.4221L60.6664 30.8452C59.6998 31.001 59.52 32.7602 59.52 35.811C59.52 38.1714 59.6998 40.0865 59.8797 44.5401L59.9246 45.2527ZM92.9969 47.5018C92.9969 45.1859 91.6932 43.8944 89.1982 43.8944C86.2985 43.8944 85.0847 45.9876 85.0847 48.1476C85.0847 50.6862 86.5683 51.7551 88.7711 51.7551C92.9295 51.7551 92.9969 47.8804 92.9969 47.5018ZM110.739 42.4915C108.761 44.0948 105.39 47.4796 103.254 47.4796C102.333 47.4796 102.108 46.6334 102.108 45.2972C102.108 41.1776 105.12 33.6287 105.12 31.6468C105.12 30.8674 104.76 30.3775 103.502 30.3775C102.153 30.3775 99.8377 31.001 99.4106 32.5375C98.3317 36.9912 96.3536 43.5158 96.3536 47.2792C96.3536 49.9736 97.4101 51.7551 100.535 51.7551C103.996 51.7551 108.582 48.9715 110.739 47.0119V42.4915ZM100.692 24.1202C100.692 26.1688 101.928 27.505 104.558 27.505C107.615 27.505 108.919 25.523 108.919 23.5189C108.919 21.2921 107.188 20.4014 105.097 20.4014C101.771 20.4014 100.692 22.7618 100.692 24.1202ZM119.536 34.9202C119.625 34.8312 119.603 41.2222 119.873 42.4247C119.536 43.2932 119.154 44.0502 118.727 44.7406C118.007 45.9208 116.974 47.0565 115.895 47.0565C113.804 47.0565 113.377 45.7427 113.377 44.5624C113.377 41.5785 115.557 36.8354 119.536 34.9202ZM134.326 42.2465C133.427 43.0037 132.573 43.6717 131.741 44.2729C130.281 45.2972 128.617 46.2993 127.493 46.2993C126.301 46.2993 125.92 44.7406 125.92 43.0481C125.92 41.7121 126.301 39.9974 126.594 39.1957C129.718 31.7136 133.427 25.5676 134.214 17.1502C134.259 16.5935 134.281 16.059 134.281 15.5469C134.281 12.1398 133.247 9 130.415 9C124.706 9 119.716 20.1786 119.446 31.6023C112.613 32.2258 107.982 38.7282 107.982 44.4065C107.982 48.1253 109.825 51.7551 113.692 51.7551C116.434 51.7551 119.244 49.929 121.469 47.7913C122.907 51.2429 125.649 51.7328 126.482 51.7328C127.965 51.7328 130.1 50.6416 131.853 49.5727C132.887 48.927 133.944 48.2144 135 47.3904L134.326 42.2465ZM130.1 18.7758C129.808 21.9156 128.504 25.9239 127.29 29.2195C126.571 31.1347 125.784 33.0497 124.93 34.9871V34.7644C124.93 33.8737 124.93 31.3351 125.177 28.3957C125.358 26.2356 126.527 14.1662 129.404 14.1662C129.943 14.1662 130.235 14.7007 130.235 16.304C130.235 16.9052 130.19 17.7292 130.1 18.7758Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between my-7">
                  <div className="flex gap-5">
                    <p className="bg-gray-100 px-8 py-2 rounded-lg text-gray-700">
                      Ticket used
                    </p>
                    <p
                      className={`px-8 py-2 rounded-lg ${
                        order.isPaid
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </p>
                  </div>
                  <div className="flex justify-center items-center text-[var(--color--secundery)]">
                    <a
                      onClick={() => toggleDetails(index)}
                      className="cursor-pointer"
                    >
                      Show Details
                    </a>
                    <div>
                      <svg
                        width="17"
                        height="9"
                        viewBox="0 0 17 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-2 transition-transform duration-300 ${
                          showDetails ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M13.457 3.6875L8.52479 6.00708L3.59254 3.6875"
                          stroke="#AAAAAA"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* show details */}
              {showDetails.includes(index) && (
                <div className="p-4 bg-white rounded-[20px] text-gray-700 max-w-180">
                  <div className="flex flex-col px-10">
                    <h3 className="text-[20px] my-2">Ticket Information</h3>
                    <div className="flex">
                      <div>
                        <img
                          src={barcode}
                          alt="barcode ticket"
                          width="200"
                          height="200"
                        />
                      </div>

                      <div className="flex justify-between mt-5 mx-10 gap-15">
                        <div>
                          <dl>
                            <div className="mb-6">
                              <dt className="text-[14px] text-[var(--color--secundery)] font-[500]">
                                Category
                              </dt>
                              <dd className="text-[16px]">PG-13</dd>
                            </div>
                            <div>
                              <dt className="text-[14px] text-[var(--color--secundery)] font-[500]">
                                Movie
                              </dt>
                              <dd className="text-[16px]">
                                {order.shortMovieTitle}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <dl>
                            <div className="mb-7">
                              <dt className="text-[14px] text-[var(--color--secundery)] font-[500]">
                                Time
                              </dt>
                              <dd className="text-[16px]">
                                {order.selectedTime}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-[14px] text-[var(--color--secundery)] font-[500]">
                                Date
                              </dt>
                              <dd className="text-[16px]">
                                {order.selectedDate}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div className="mb-7">
                          <dl>
                            <div>
                              <dt className="text-[14px] text-[var(--color--secundery)] font-[500]">
                                seats
                              </dt>
                              <dd className="text-[14px] flex gap-4 mb-8 flex-wrap">
                                {order.selectedSeats.join(",")}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-[14px] text-[var(--color--secundery)] font-[500]">
                                Count
                              </dt>
                              <dd className="text-[16px]">
                                {order.numberOfTicket}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="flex justify-center items-center">
                        <dl>
                          <dt>Total</dt>
                          <dd className="font-bold">
                            Rp{order.totalPrice.toLocaleString("id-ID")}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default OrderHistory;
