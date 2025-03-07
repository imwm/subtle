document.getElementById("emailForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const messageEl = document.getElementById("submitMessage");
  const formInputs = document.getElementById("formInputs");
  const spinner = document.getElementById("loadingSpinner");
  const form = document.getElementById("emailForm");

  // Store the current form height before any changes
  const formHeight = form.offsetHeight;

  // Ensure the form has a fixed height to start with
  form.style.height = `${formHeight}px`;

  // Show spinner
  spinner.classList.remove("hidden");

  // Prepare the success message
  messageEl.textContent = "✓ Thanks for subscribing!";
  messageEl.classList.remove("text-red-500");
  messageEl.classList.add("text-green-600", "dark:text-green-400");
  messageEl.style.opacity = "0";

  // Apply transitions to prevent jumps
  formInputs.style.opacity = "0";

  // Variable to store the collapse timeout so we can clear it if needed
  let collapseTimeout;

  setTimeout(() => {
    // Hide inputs and show message
    formInputs.classList.add("hidden");
    messageEl.classList.remove("hidden");
    messageEl.classList.add("flex");
    e.target.reset();

    // Fade in the thank you message
    setTimeout(() => {
      messageEl.style.opacity = "1";

      // After 2 seconds, collapse the form vertically
      collapseTimeout = setTimeout(() => {
        // First ensure transition properties are set
        form.style.transition = "all 200ms ease";

        // Force a reflow to ensure the transition takes effect
        void form.offsetWidth;

        // Apply the collapse in two steps for better browser compatibility
        requestAnimationFrame(() => {
          // First step - prepare for animation
          form.classList.add("collapsing");

          // Second step - trigger the animation
          requestAnimationFrame(() => {
            form.style.height = "0px";
            form.style.opacity = "0";
            form.style.marginBottom = "0";
            form.style.paddingBottom = "0";
            form.classList.add("collapsed");
          });
        });
      }, 2000);
    }, 50);
  }, 200);

  try {
    const response = await fetch("https://formsubmit.co/ajax/hi@subtle.so", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    // Only handle error case since success is already shown
    if (!response.ok) {
      throw new Error("Submission failed");
    }
  } catch (error) {
    // Show error message if the request fails
    messageEl.textContent = "Something went wrong. Please try again.";
    messageEl.classList.remove("text-green-600", "dark:text-green-400");
    messageEl.classList.add("text-red-500");

    // Don't collapse the form if there's an error
    clearTimeout(collapseTimeout);
  } finally {
    spinner.classList.add("hidden");
  }
});
