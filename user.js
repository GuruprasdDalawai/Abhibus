function paynow(element) {
  let journeydetails = JSON.parse(element.dataset.details);
  let buslist = JSON.parse(localStorage.getItem("buslist"));
  let currentUSer = localStorage.getItem("isLogin");
  let journeyDate = "";
  let totalfare;
  buslist.forEach((obj) => {
    if (obj.id === journeydetails.busid) {
      let bookedlist = obj.bookedSeats ? Array.from(obj.bookedSeats) : [];
      let selectedSeats = Array.from(journeydetails.selectedSeats);
      let list = [...bookedlist, ...selectedSeats];
      obj.bookedSeats = list;
      journeyDate = obj.departureDateTime;
      totalfare = parseInt(obj.fare) * selectedSeats.length;
    }
  });

  let bookedTikets = [];
  if (localStorage.getItem("bookedTicket") !== null) {
    bookedTikets = JSON.parse(localStorage.getItem("bookedTicket"));
  }

  let obj_tiket_details = {
    pnr: "R_" + generateID(),
    mobileNumber: currentUSer,
    passagers: journeydetails.passangerlist,
    seats: Array.from(journeydetails.selectedSeats),
    journeyDate: journeyDate,
    totalfare: totalfare,
  };
  bookedTikets.push(obj_tiket_details);
  localStorage.setItem("buslist", JSON.stringify(buslist));
  localStorage.setItem("bookedTicket", JSON.stringify(bookedTikets));

  console.log(obj_tiket_details);
  let elemtntTicket = document.getElementById("ticketdetails");
  elemtntTicket.style.display = "block";
  for (const [key, value] of Object.entries(obj_tiket_details)) {
    elemtntTicket.insertAdjacentHTML(
      "beforeend",
      `
    <div><span>${key}</span> <span> ${value}</span>
    `
    );
  }
}

function showpaymentContainer() {}

function goForPayment(elemnt) {
  let details = JSON.parse(elemnt.dataset.details);
  let passsagerName = [];
  let inputs = Array.from(
    document.getElementById("passngerListinput").getElementsByTagName("input")
  );
  inputs.forEach((input) => {
    passsagerName.push(input.value);
  });
  details.passangerlist = passsagerName;
  document.getElementById("paymentContainer").style.display = "block";
  document.getElementById("btnCardPaymnet").dataset.details =
    JSON.stringify(details);
  document.getElementById("btnVirtualPaymnet").dataset.details =
    JSON.stringify(details);
}

function showPassangerpage(elemnt) {
  let details = JSON.parse(elemnt.dataset.details);

  let list = details.selectedSeats.length;
  let element_passngerListinput = document.getElementById("passngerListinput");
  element_passngerListinput.innerHTML = "";
  for (i = 1; i <= list; i++) {
    element_passngerListinput.insertAdjacentHTML(
      "beforeend",
      `<div class="input-box">
      <input type="text" placeholder="Passange${i}" />
    </div>`
    );
  }

  document.getElementById("btbgoforPayment").dataset.details =
    elemnt.dataset.details;

  document.getElementById("passngerDetails").style.display = "block";
}

function showseats(element) {
  let id = element.dataset.id;
  let bustlist = JSON.parse(localStorage.getItem("buslist"));
  let res = bustlist.filter((obj) => obj.id === id);

  let busdetails = res[0];
  let bookedSeates = String(busdetails.bookedSeats).split(",");
  console.log(bookedSeates);
  document.getElementById("seatContiner").style.display = "block";

  const seats = document.querySelectorAll(".seat");
  let selectedSeats = 0;

  let seatListtoBook = [];

  seats.forEach((seat) => {
    seat.classList.remove("booked");
  });

  seats.forEach((seat) => {
    const seatNumber = seat.dataset.seat;
    if (bookedSeates.includes(seatNumber)) {
      seat.classList.add("booked");
    }
  });

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
        seatListtoBook.push(seatNumber);
        console.log("Seat " + seatNumber + " selected.");
      } else if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats--;
        seatListtoBook = seatListtoBook.filter((val) => val !== seatNumber);
        console.log("Seat " + seatNumber + " unselected.");
      }

      if (selectedSeats > 0) {
        document.getElementById("btnBookSets").style.display = "block";
        document.getElementById("btnBookSets").dataset.details = JSON.stringify(
          { busid: id, selectedSeats: seatListtoBook }
        );
      } else {
        document.getElementById("btnBookSets").style.display = "none";
        document.getElementById("btnBookSets").dataset.details = JSON.stringify(
          { busid: id, selectedSeats: seatListtoBook }
        );
      }
    });
  });
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

function displayContentBoy(obj) {
  let d_dt = new Date(obj.departureDateTime);
  let date_dtStr =
    d_dt.getDate() + "-" + (d_dt.getMonth() + 1) + "-" + d_dt.getFullYear();
  let time_dtStr =
    String(d_dt.getHours()).padStart(2, "0") +
    ":" +
    String(d_dt.getMinutes()).padStart(2, "0");

  let a_dt = new Date(obj.ArrivalDateTime);
  let date_atStr =
    a_dt.getDate() + "-" + (a_dt.getMonth() + 1) + "-" + a_dt.getFullYear();
  let time_atStr =
    String(a_dt.getHours()).padStart(2, "0") +
    ":" +
    String(a_dt.getMinutes()).padStart(2, "0");

  let bookedSeates = obj.bookedSeats
    ? obj.freeSeats - String(obj.bookedSeats).split(",").length
    : obj.freeSeats;

  document.getElementById("displayContent").insertAdjacentHTML(
    "beforeend",
    `<div  class="Wrapper addBus">
          <div>
            <span>${obj.company}</span>
            <div>${obj.busNumber}</div>
          </div>
          <div>
            <span>${obj.source}</span>
            <span>${date_dtStr}</span>
            <span>${time_dtStr}</span>
          </div>
          <div>
            <spen>${obj.destination}</spen>
            <span>${date_atStr}</span>
            <span>${time_atStr}</span>
          </div>
          <div class="">
            <span>₹${obj.fare} </span>
            <span> ${bookedSeates}</span>
            <span> seats Available</span>
            <button class="btn" data-id="${obj.id}"onclick="showseats(this)">Book</button>
          </div>
          </div>`
  );
}

function generateID() {
  try {
    return Math.floor(new Date().getTime() / 1000);
  } catch (e) {
    console.error("Error in generating ID:", e);
    return null;
  }
}

function searchBuses() {
  let from = document.getElementById("txtSearchFrom").value;
  let to = document.getElementById("txtSearchTo").value;
  let journeyDate = document.getElementById("SearchDate").value;

  let buslist = [];
  if (localStorage.getItem("buslist") !== null) {
    buslist = JSON.parse(localStorage.getItem("buslist"));
  }
  let element = document.getElementById("displayContent");
  let filtered = buslist.filter((obj) => {
    let date1 = new Date(obj.departureDateTime);
    let date2 = new Date(journeyDate);
    if (
      obj.source.toLowerCase() == from.toLowerCase() &&
      obj.destination.toLowerCase() == to.toLowerCase() &&
      date2 <= date1
    ) {
      return obj;
    }
  });

  console.log(filtered);
  element.innerHTML = "";
  if (filtered.length > 0) filtered.forEach(displayContentBoy);
  else element.insertAdjacentHTML("beforeend", `<h1>Results not found</h1>`);
}

function showBookedTikets() {
  let TicketElemt = document.getElementById("ticketlist");
  TicketElemt.style.display = "block";
  let bookedTickets = [];
  let userMobile = "";
  TicketElemt.innerHTML = "";
  if (localStorage.getItem("bookedTicket") !== null) {
    bookedTickets = JSON.parse(localStorage.getItem("bookedTicket"));
    userMobile = localStorage.getItem("isLogin");

    let filteredTicket = bookedTickets.filter(
      (obj) => obj.mobileNumber === userMobile
    );
    if (filteredTicket.length > 0) {
      filteredTicket.forEach(TickesDisplay);
    } else {
      document
        .getElementById("ticketlist")
        .insertAdjacentHTML("beforeend", `<h1>No Tickectes<h1>`);
    }
  } else {
    document
      .getElementById("ticketlist")
      .insertAdjacentHTML("beforeend", `<h1>No Tickectes<h1>`);
  }
}

function TickesDisplay(obj) {
  // let d_dt = new Date(obj.departureDateTime);
  // let date_dtStr =
  //   d_dt.getDate() + "-" + (d_dt.getMonth() + 1) + "-" + d_dt.getFullYear();
  // let time_dtStr =
  //   String(d_dt.getHours()).padStart(2, "0") +
  //   ":" +
  //   String(d_dt.getMinutes()).padStart(2, "0");

  document.getElementById("ticketlist").insertAdjacentHTML(
    "beforeend",
    `<div  class="Wrapper">
      <span>PNR : ${obj.pnr}</span>
      <span> Journaey Date : ${obj.journeyDate}</span>
      <button data-pnr= ${obj.pnr} onclick="CancleTicket(this)">CANCEL</button>
    <div>`
  );
}
function CancleTicket() {}
