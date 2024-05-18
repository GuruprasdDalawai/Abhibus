// if (localStorage.getItem("isLogin") == null) {
//   location.href = "./index.html";
// }

function showBusForm(event) {
  document.getElementById("addnewbus").style.display = "block";
}

function closeBusForm() {
  document.getElementById("addnewbus").style.display = "none";
}

function showUpdateBusform(element) {
  document.getElementById("update").style.display = "block";
  setValuesToUpdade(element.dataset.set);
}

function closeUpdateBusForm() {
  document.getElementById("update").style.display = "none";
}

function setValuesToUpdade(id) {
  let buslist = JSON.parse(localStorage.getItem("buslist"));
  let res = buslist.filter((obj) => obj.id === id);
  if (res.length) {
    let obj = res[0];
    document.getElementById("updateBusno").value = obj.busNumber;
    document.getElementById("updateSource").value = obj.source;
    document.getElementById("updateDeestination").value = obj.destination;
    let d_dt = new Date(obj.departureDateTime);
    const departurTimeset =
      d_dt.getFullYear() +
      "-" +
      String(d_dt.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d_dt.getDate()).padStart(2, "0") +
      "T" +
      String(d_dt.getHours()).padStart(2, "0") +
      ":" +
      String(d_dt.getMinutes()).padStart(2, "0");

    let a_dt = new Date(obj.ArrivalDateTime);
    const arrivalTimeset =
      a_dt.getFullYear() +
      "-" +
      String(a_dt.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(a_dt.getDate()).padStart(2, "0") +
      "T" +
      String(a_dt.getHours()).padStart(2, "0") +
      ":" +
      String(a_dt.getMinutes()).padStart(2, "0");

    document.getElementById("updateDeparuteTime").value = departurTimeset;
    document.getElementById("updateArrivalTime").value = arrivalTimeset;
    document.getElementById("updateSeat").value = obj.freeSeats;
    document.getElementById("updateFare").value = obj.fare;
    document.getElementById("updateCompany").value = obj.company;

    document.getElementById("updatebtn").dataset.id = obj.id;
    document.getElementById("deleteBtn").dataset.id = obj.id;
  }
}

function addNewBus() {
  try {
    let addbusNumber = document.getElementById("addbusNo").value;
    let addbusSource = document.getElementById("addbusSource").value;
    let addbusDestination = document.getElementById("addbusDestination").value;
    let addbusDepartureTime = document.getElementById(
      "addbusDepartureTime"
    ).value;
    let addbusArrivalTime = document.getElementById("addbusArrivalTime").value;
    let addbusSeats = document.getElementById("addbusSeats").value;
    let addbusfare = document.getElementById("addbusfare").value;
    let addbuscompany = document.getElementById("addbuscompany").value;

    if (!validateBusno(addbusNumber)) {
      displayErr("Invalid BusNo", "addbusNo_err");
      return;
    } else {
      restErr("addbusNo_err");
    }
    if (!validateSorce(addbusSource)) {
      displayErr("InavalidSource", "addbusSource_err");
      return;
    } else {
      restErr("addbusSource_err");
    }
    if (!validateDestination(addbusDestination)) {
      displayErr("Invalid Destination", "addbusDestination_err");
      return;
    } else {
      restErr("addbusDestination_err");
    }
    if (!validateDepartureTime(addbusDepartureTime)) {
      displayErr("Invalid Departure Time", "addbusDepartureTime_err");
      return;
    } else {
      restErr("addbusDepartureTime_err");
    }
    if (!validateArrivalTime(addbusArrivalTime)) {
      displayErr("Invalid ArrivalTime", "addbusArrivalTime_err");
      return;
    } else {
      restErr("addbusArrivalTime_err");
    }
    if (!validateBusfare(addbusfare)) {
      displayErr("Invalid Fare", "addbusfare_err");
      return;
    } else {
      restErr("addbusfare_err");
    }
    if (!validteCompany(addbuscompany)) {
      displayErr("Invalid company", "addbuscompany_err");
      return;
    } else {
      restErr("addbuscompany_err");
    }
    let buslist = [];
    if (localStorage.getItem("buslist") !== null) {
      buslist = JSON.parse(localStorage.getItem("buslist"));
    }

    let busID = generateID_bus();
    buslist.push({
      id: busID,
      busNumber: addbusNumber.toUpperCase(),
      source: addbusSource.toUpperCase(),
      destination: addbusDestination.toUpperCase(),
      departureDateTime: addbusDepartureTime,
      ArrivalDateTime: addbusArrivalTime,
      freeSeats: addbusSeats,
      fare: addbusfare,
      company: addbuscompany,
      bookedSeats: [],
    });
    localStorage.setItem("buslist", JSON.stringify(buslist));
    buslist.forEach(displayContentBoy);
    document.getElementById("addnewbus").style.display = "none";
    location.reload();
  } catch (e) {
    console.log(e);
  }
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}
function multipleDateRangeOverlaps() {
  var i, j;
  if (arguments.length % 2 !== 0)
    throw new TypeError("Arguments length must be a multiple of 2");
  for (i = 0; i < arguments.length - 2; i += 2) {
    for (j = i + 2; j < arguments.length; j += 2) {
      if (
        dateRangeOverlaps(
          arguments[i],
          arguments[i + 1],
          arguments[j],
          arguments[j + 1]
        )
      )
        return true;
    }
  }
  return false;
}

function validateBusno(busNumber) {
  if (busNumber) return true;
  return false;
}

function validateSorce(source) {
  if (source) return true;
  return false;
}

function validateDestination(destination) {
  if (destination) return true;
  return false;
}

function validateDepartureTime(departureTime) {
  if (departureTime) return true;
  return false;
}

function validateArrivalTime(arrivalTime) {
  if (arrivalTime) return true;
  return false;
}

function validateBusfare(fare) {
  if (fare) return true;
  return false;
}

function validteCompany(company) {
  if (company) return true;
  return false;
}

function displayErr(message, elemntID) {
  let elemnt = document.getElementById(elemntID);
  elemnt.textContent = message;
  elemnt.parentElement.style.display = "block";
}

function restErr(elemntID) {
  let elemnt = document.getElementById(elemntID);
  elemnt.parentElement.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("buslist") !== null) {
    let buslist = JSON.parse(localStorage.getItem("buslist"));
    document.getElementById("displayContiner").innerHTML = "";
    buslist.forEach(displayContentBoy);
  }
});

function searchkey() {
  searchBuses();
}

function searchBuses() {
  let seachText = document.getElementById("searchInput").value;
  let filterArr;
  if (seachText) {
    let buslist = [];
    if (localStorage.getItem("buslist") !== null) {
      buslist = JSON.parse(localStorage.getItem("buslist"));
      filterArr = buslist.filter((obj) => {
        let comany = obj.company.toLowerCase();
        let busno = obj.busNumber.toLowerCase();
        seachText.toLowerCase();
        if (
          comany.includes(seachText.toLowerCase()) ||
          busno.includes(seachText.toLowerCase())
        ) {
          return obj;
        }
      });
      document.getElementById("displayContiner").innerHTML = "";
      filterArr.forEach(displayContentBoy);
    }
  } else {
    buslist = JSON.parse(localStorage.getItem("buslist"));
    document.getElementById("displayContiner").innerHTML = "";
    buslist.forEach(displayContentBoy);
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
    ? obj.freeSeats - obj.bookedSeats.length
    : obj.freeSeats;

  document.getElementById("displayContiner").insertAdjacentHTML(
    "beforeend",
    `<div  class="Wrapper addBus"  data-set="${obj.id}" onclick="showUpdateBusform(this)">
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
            <span>${bookedSeates} seats Available</span>
          </div>
          </div>`
  );
}

function updateBus(element) {
  let id = element.dataset.id;
  let updateBusno = document.getElementById("updateBusno").value;
  let updateSource = document.getElementById("updateSource").value;
  let updateDeestination = document.getElementById("updateDeestination").value;
  let updateDeparuteTime = document.getElementById("updateDeparuteTime").value;
  let updateArrivalTime = document.getElementById("updateArrivalTime").value;
  let updateSeat = document.getElementById("updateSeat").value;
  let updateFare = document.getElementById("updateFare").value;
  let updateCompany = document.getElementById("updateCompany").value;

  let buslist = [];
  if (localStorage.getItem("buslist") !== null) {
    buslist = JSON.parse(localStorage.getItem("buslist"));
    buslist.forEach((obj) => {
      if (obj.id === id) {
        obj.busNumber = updateBusno;
        obj.source = updateSource;
        obj.destination = updateDeestination;
        obj.departureDateTime = updateDeparuteTime;
        obj.ArrivalDateTime = updateArrivalTime;
        obj.freeSeats = updateSeat;
        obj.fare = updateFare;
        obj.company = updateCompany;
      }
    });
    document.getElementById("displayContiner").innerHTML = "";
    buslist.forEach(displayContentBoy);
    localStorage.setItem("buslist", JSON.stringify(buslist));
    document.getElementById("update").style.display = "none";
  }
}

function deleteBus(element) {
  let id = element.dataset.id;
  buslist = JSON.parse(localStorage.getItem("buslist"));
  let removedlist = buslist.filter((obj) => obj.id !== id);
  document.getElementById("displayContiner").innerHTML = "";
  removedlist.forEach(displayContentBoy);
  localStorage.setItem("buslist", JSON.stringify(removedlist));
  document.getElementById("update").style.display = "none";
}

function generateID_bus() {
  try {
    return "B_" + Math.floor(new Date().getTime() / 1000);
  } catch (e) {
    console.error("Error in generating ID:", e);
    return null;
  }
}

function updateDestinationOptions() {
  const addbusSource = document.getElementById("addbusSource");
  const addbusDestination = document.getElementById("addbusDestination");
  const selectedSource = addbusSource.value;
  // Clear existing options in the destination select
  addbusDestination.innerHTML = "";
  // Add a "Select" option for user choice
  const selectOption = document.createElement("option");
  selectOption.value = "";
  selectOption.textContent = "Select";
  addbusDestination.appendChild(selectOption);
  // Add remaining cities as destination options (excluding selected source)
  const cities = ["Bengaluru", "Hyderabad", "Mumbai", "Channai"];
  for (const city of cities) {
    if (city !== selectedSource) {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      addbusDestination.appendChild(option);
    }
  }
}

function ShowNoficationDetails() {
  document.getElementById("notificationConatiner").style.display = "block";
  let element = document.getElementById("addNotificationTbl");
  element.innerHTML = "";
  element.insertAdjacentHTML(
    "beforeend",
    `<tr>
    <td>PNR</td>
    <td>MobileNumber</td><td>Seats</td
    ><td>Status</td>
  </tr>`
  );
  console.log(element);
  if (localStorage.getItem("adminNotification") !== null) {
    let Notification = JSON.parse(localStorage.getItem("adminNotification"));
    Notification.forEach((obj) => {
      element.insertAdjacentHTML(
        "beforeend",
        `<tr>
        <td>${obj.pnr}</td>
        <td>${obj.mobileNumber}</td><td>${obj.seats.length}</td
        ><td>${obj.status}</td>
      </tr>`
      );
    });
  }
  localStorage.setItem("adminNotification", JSON.stringify([]));
}

function adminLogout() {
  localStorage.setItem("isLogin", "");
  location.href = "index.html";
}

function closeNotification() {
  document.getElementById("notificationConatiner").style.display = "none";
}
