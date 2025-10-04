import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  ticketPrice: 10,
  totalPrice: 0,
  selectedDate: "",
  selectedTime: "",
  name: "",
  email: "",
  phone: "",
  errors: { name: "", email: "", phone: "" },
  isOverlayOpen: false,
  moviePoster: "",
  movieTitle: "",
  movieGenre: "",
  scheduleId: null,
  seatMap: {},
  cinemaName: null,
  cinemaPrice: 0,
};
const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    toggleSeat: (state, action) => {
      const seat = action.payload;
      if (state.selectedSeats.includes(seat)) {
        state.selectedSeats = state.selectedSeats.filter((s) => s !== seat);
      } else {
        state.selectedSeats.push(seat);
      }

      // total price pakai harga cinema yang dipilih
      state.totalPrice = state.selectedSeats.length * (state.cinemaPrice || 0);
    },
    resetOrder: (state) => {
      state.selectedSeats = [];
      state.totalPrice = 0;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    toggleOverlay: (state, action) => {
      state.isOverlayOpen = action.payload;
    },
    setMoviePoster: (state, action) => {
      state.moviePoster = action.payload;
    },
    setMovieTitle: (state, action) => {
      state.movieTitle = action.payload;
    },
    setMovieGenre: (state, action) => {
      state.movieGenre = action.payload;
    },
    setScheduleId: (state, action) => {
      state.scheduleId = action.payload;
    },
    setCinema: (state, action) => {
      state.cinemaName = action.payload.name; // action kirim object {name, price}
      state.cinemaPrice = action.payload.price;
    },
    setScheduleTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    setScheduleDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSeatMap: (state, action) => {
      state.seatMap = action.payload;
    },
    clearDataMovie: (state) => {
      state.selectedSeats = [];
      state.totalPrice = 0;
      state.selectedDate = "";
      state.selectedTime = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.errors = { name: "", email: "", phone: "" };
      state.isOverlayOpen = false;
      state.movieTitle = "";
    },
  },
});

export const {
  toggleSeat,
  resetOrder,
  setSelectedDate,
  setSelectedTime,
  setName,
  setEmail,
  setPhone,
  setErrors,
  toggleOverlay,
  resetPayment,
  setMoviePoster,
  setMovieTitle,
  setMovieGenre,
  setScheduleId,
  setCinema,
  setScheduleDate,
  setScheduleTime,
  setSeatMap,
  clearDataMovie,
} = orderSlice.actions;
export default orderSlice.reducer;
