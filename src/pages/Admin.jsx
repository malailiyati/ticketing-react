import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

const dataMap = {
  spiderman: {
    monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [500, 400, 500, 600, 800, 700],
      title: "Spiderman - Monthly",
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [70, 50, 105, 60],
      title: "Spiderman - weekly",
    },
  },
  blackwidow: {
    monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [500, 600, 700, 500, 200, 400],
      title: "Black Widow - Monthly",
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [90, 50, 45, 70],
      title: "Black Widow - weekly",
    },
  },
};

const ticketMap = {
  adventure: {
    purwokerto: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [800, 700, 400, 500, 650, 470],
      title: "Adventure - Purwokerto",
    },
    bogor: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [80, 60, 105, 90],
      title: "Adventure, Bogor",
    },
  },
  action: {
    purwokerto: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [300, 400, 700, 500, 400, 800],
      title: "Action - Purwokerto",
    },
    bogor: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [60, 50, 45, 70],
      title: "Action - Bogor",
    },
  },
};

function SalesChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [movieName, setMovieName] = useState("spiderman");
  const [timeFilter, setTimeFilter] = useState("weekly");
  const [title, setTitle] = useState(dataMap[movieName][timeFilter].title);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dataMap[movieName][timeFilter].labels,
        datasets: [
          {
            label: "",
            data: dataMap[movieName][timeFilter].data,
            borderWidth: 1,
            borderColor: "blue",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            fill: true,
            tension: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "$" + value;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    setTitle(dataMap[movieName][timeFilter].title);
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [movieName, timeFilter]);

  return (
    <section className="bg-white p-6 rounded shadow-md w-3/5 mx-auto">
      <div>
        <div className="font-semibold mb-4 text-lg">Sales Chart</div>
        <div className="flex gap-4 items-center mb-6">
          <div>
            <select
              id="movieName"
              name="movieName"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              className="border rounded px-3 py-1 bg-gray-100"
            >
              <option value="spiderman">Spiderman</option>
              <option value="blackwidow">Black Widow</option>
              {/* <option value="tenet">Tenet</option> */}
              {/* <option value="theWitches">The Witches</option> */}
            </select>
          </div>

          <div>
            <select
              id="timeFilter"
              name="timeFilter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border rounded px-3 py-1 bg-gray-100"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <button className="bg-[var(--color--primary)] text-white py-1 px-5 rounded-md">
              Filter
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="salesChartTitle title font-medium mb-5">{title}</div>
        <canvas ref={chartRef} id="salesChart" height="150" />
      </div>
    </section>
  );
}

function TicketSalesChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [category, setCategory] = useState("adventure");
  const [location, setLocation] = useState("purwokerto");
  const [title, setTitle] = useState(ticketMap[category][location].title);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ticketMap[category][location].labels,
        datasets: [
          {
            label: "",
            data: ticketMap[category][location].data,
            borderWidth: 1,
            borderColor: "blue",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            fill: true,
            tension: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "$" + value;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    setTitle(ticketMap[category][location].title);
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [category, location]);

  return (
    <section className="bg-white p-6 rounded shadow-md w-3/5 mx-auto">
      <div>
        <div className="font-semibold mb-4 text-lg">Ticket Sales</div>
        <div className="flex gap-4 items-center mb-6">
          <div>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-3 py-1 bg-gray-100"
            >
              <option value="adventure">Adventure</option>
              <option value="action">Action</option>
            </select>
          </div>

          <div>
            <select
              id="locationFilter"
              name="locationFilter"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded px-3 py-1 bg-gray-100"
            >
              <option value="purwokerto">Purwokerto</option>
              <option value="bogor">Bogor</option>
            </select>
          </div>
          <button className="bg-[var(--color--primary)] text-white py-1 px-5 rounded-md">
            Filter
          </button>
        </div>
      </div>

      <div>
        <div className="ticketSalesTitle title font-medium mb-5">{title}</div>
        <canvas ref={chartRef} id="ticketChart" height="150" />
      </div>
    </section>
  );
}

function Admin() {
  return (
    <main className="bg-[#a0a3bd33] flex flex-col justify-center items-center py-30">
      <SalesChart />
      <TicketSalesChart />
    </main>
  );
}

export default Admin;
