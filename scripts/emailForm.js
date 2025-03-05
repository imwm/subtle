document
  .getElementById("emailForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const messageEl = document.getElementById("submitMessage");
    const formInputs = document.getElementById("formInputs");
    const spinner = document.getElementById("loadingSpinner");

    spinner.classList.remove("hidden");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/hi@subtle.so",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (response.ok) {
        messageEl.textContent = "✓ Thanks for subscribing!";
        formInputs.classList.add("hidden");
        messageEl.classList.remove("hidden");
        messageEl.classList.add("flex");
        e.target.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      messageEl.textContent = "Something went wrong. Please try again.";
      messageEl.classList.remove("text-green-600", "dark:text-green-400");
      messageEl.classList.add("text-red-500");
      formInputs.classList.add("hidden");
      messageEl.classList.remove("hidden");
      messageEl.classList.add("flex");
    } finally {
      spinner.classList.add("hidden");
    }
  }); 