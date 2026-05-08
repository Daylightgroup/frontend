document.getElementById("bookingForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    try {

      const response = await fetch(`${API_URL}/booking`, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      alert(result.message || "Booking submitted successfully!");

      form.reset();

    } catch (error) {

      console.error(error);

      alert("Submission failed.");

    }

  });