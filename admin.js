function showBusForm() {
  document.getElementById("addnewbus").style.display = "block";
}

function closeBusForm() {
  document.getElementById("addnewbus").style.display = "none";
}

function showUpdateBusform() {
  document.getElementById("update").style.display = "block";
}

function closeUpdateBusForm() {
  document.getElementById("update").style.display = "none";
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

    console.log(addbusNumber);
    console.log(addbusSource);
    console.log(addbusDestination);
    console.log(addbusDepartureTime);
    console.log(addbusArrivalTime);
    console.log(addbusSeats);
    console.log(addbusfare);
    console.log(addbuscompany);

    let buslist = [];
    if (localStorage.getItem("buslist") !== null) {
      buslist = localStorage.getItem("buslist");
      buslist = [...buslist];
    }
    buslist.push({
      busNumber: addbusNumber,
      source: addbusSource,
      destination: addbusDestination,
      departureDateTime: addbusDepartureTime,
      ArrivalDateTime: addbusArrivalTime,
      freeSeats: addbusSeats,
      fare: addbusfare,
      company: addbuscompany,
    });
    localStorage.setItem("buslist", JSON.stringify(buslist));

    // let buslist = []; //localStorage.getItem("buslist");
    // if (localStorage.getItem("buslist") !== null) {
    //   buslist = localStorage.getItem("buslist");
    //   buslist=[...buslist]
    //   buslist.filter(obj=>{
    // let departureTime = new Date(obj.departureTime);
    // let arrivalTime = new Date(obj.arrivalTime);
    // let chekingDepatureTime = new Date(addbusDepartureTime);
    // let ChekingArivalTime = new Date(addbusArrivalTime);
    //      if (obj.buNumber==addbusNumber && departureTime>=chekingDepatureTime)
    //   })
    // }
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
