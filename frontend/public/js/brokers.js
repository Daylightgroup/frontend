const API_URL = "https://your-render-backend.onrender.com";

function scrollToSection() {
  document
    .getElementById("services")
    .scrollIntoView({
      behavior: "smooth"
    });
}

function contactAlert() {
  alert("Please contact our trade desk at trade@nileglobalrefinery.com");
}

document
  .getElementById("tradeForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = e.target;

    const formData = {
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      commodity: form.commodity.value,
      quantity: form.quantity.value,
      deliveryMethod: form.deliveryMethod.value,
      details: form.details.value
    };

    try {

      const response = await fetch(
        `${API_URL}/trade-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      alert(result.message || "Trade request submitted!");

      form.reset();

    } catch (error) {

      console.error(error);

      alert("Failed to submit request.");

    }

  });