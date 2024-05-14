function showseats() {
  document.getElementById("seatContiner").style.display = "block";

  (function () {
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
  })();
}

function closeSeatSelection() {
  document.getElementById("seatContiner").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("buslist") !== null) {
    let buslist = JSON.parse(localStorage.getItem("buslist"));
    buslist.forEach(displayContentBoy);
  }
});

function userSearch() {
  let from = document.getElementById().value;
  let to = document.getElementById().value;
  let buslist = JSON.parse(localStorage.getItem("bustlist"));
  if (buslist !== null) {
    buslist.forEach(displayBodyContent);
  }
}

function displayBodyContent(obj) {
  document.getElementById("displayContent").insertAdjacentElement(
    "beforeend",
    `<div id="addBus" class="Wrapper addBus">
  <div>
    <span>${obj.company}</span>
    <div>${obj.busNumber}</div>
  </div>
  <div>
    <span>${obj.source}</span>
    <span>24-05-2024</span>
    <span>20:45</span>
  </div>
  <div>
    <spen>${obj.destination}</spen>
    <span>23-05-2024</span>
    <spen>06:45</spen>
  </div>
  <div class="">
    <span>₹${obj.fare} </span>
    <span>3 seats Available</span>
    <button class="btn" onclick="showseats()">Book</button>
  </div>
</div>`
  );
}
