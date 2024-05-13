document.addEventListener("DOMContentLoaded", function () {
  const seats = document.querySelectorAll(".seat");
  let selectedSeats = 0;

  seats.forEach((seat) => {
    seat.addEventListener("click", () => {
      const seatNumber = seat.dataset.seat;

      if (
        !seat.classList.contains("selected") &&
        selectedSeats < 4 &&
        !seat.classList.contains("booked")
      ) {
        seat.classList.add("selected");
        selectedSeats++;
        console.log("Seat " + seatNumber + " selected.");
      } else if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats--;
        console.log("Seat " + seatNumber + " unselected.");
      }
    });
  });
});
