const paymentOptions = document.querySelectorAll(".payment-option");
const paymentForms = document.querySelectorAll(".payment-form");

paymentOptions.forEach((button) => {
  button.addEventListener("click", function () {
    const targetId = this.dataset.target;
    paymentOptions.forEach((option) => option.classList.remove("active"));
    this.classList.add("active");
    paymentForms.forEach((form) => (form.style.display = "none"));
    document.getElementById(targetId).style.display = "block";
  });
});

function addNewBus(buslist, newBus) {
  // Check for existing bus with the same number
  const existingBus = buslist.find((bus) => bus.busNumber === newBus.busNumber);

  // If no existing bus found, add the new bus directly
  if (!existingBus) {
    buslist.push(newBus);
    return;
  }

  // Existing bus found, check for conflicts
  const newDeparture = new Date(newBus.departureDateTime);
  const existingDeparture = new Date(existingBus.departureDateTime);
  const newArrival = new Date(newBus.arrivalDateTime);
  const existingArrival = new Date(existingBus.arrivalDateTime);

  // Conflicting scenarios:
  if (newDeparture < existingDeparture && newArrival > existingArrival) {
    console.warn(
      `Bus with number ${newBus.busNumber} has conflicting arrival/departure times with existing bus. Ignoring new bus.`
    );
    return;
  } else if (
    newDeparture >= existingDeparture &&
    newDeparture <= existingArrival
  ) {
    console.warn(
      `Bus with number ${newBus.busNumber} has overlapping departure time with existing bus. Ignoring new bus.`
    );
    return;
  } else if (newArrival >= existingDeparture && newArrival <= existingArrival) {
    console.warn(
      `Bus with number ${newBus.busNumber} has overlapping arrival time with existing bus. Ignoring new bus.`
    );
    return;
  }

  // Allow adding new bus if entirely outside existing bus timeframe
  buslist.push(newBus);
  console.info(
    `Bus with number ${newBus.busNumber} added without conflicting with existing bus.`
  );
}
