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
