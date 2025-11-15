// Add a flag to track if the event listener has been attached
if (!window.emailFormInitialized) {
  window.emailFormInitialized = true;

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Find the form after components are loaded
    const setupForm = () => {
      const form = document.getElementById("emailForm");
      if (!form) {
        // If form not found yet, try again in 100ms (components might still be loading)
        setTimeout(setupForm, 100);
        return;
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const messageEl = document.getElementById("submitMessage");
        const formInputs = document.getElementById("formInputs");
        const spinner = document.getElementById("loadingSpinner");

        // Store the current form height before any changes
        const formHeight = form.offsetHeight;

        // Ensure the form has a fixed height to start with
        form.style.height = `${formHeight}px`;

        // Show spinner
        spinner.classList.remove("hidden");

        // Prepare the success message - make it more visible
        messageEl.textContent = "✓ Thanks for subscribing!";
        messageEl.classList.remove("text-red-500");
        messageEl.classList.add("text-green-600", "dark:text-green-400");

        // Apply transitions to prevent jumps
        formInputs.style.opacity = "0";

        // Variable to store the collapse timeout so we can clear it if needed
        let collapseTimeout;

        // Immediately hide inputs and show success message for instant feedback
        setTimeout(() => {
          // Hide inputs and show message
          formInputs.classList.add("hidden");
          messageEl.classList.remove("hidden");
          messageEl.classList.add("flex");
          messageEl.style.opacity = "1"; // Make visible immediately
          e.target.reset();

          // After 2 seconds, collapse the form vertically
          collapseTimeout = setTimeout(() => {
            // First ensure transition properties are set
            form.style.transition = "all 300ms ease";

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
        }, 50); // Reduced from 200ms to 50ms for more immediate feedback

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: "15116351-6c46-4b5d-8e6c-46533d27743a",
              email: email,
            }),
          });

          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.message || "Submission failed");
          }
        } catch (error) {
          // If submission fails, show error
          messageEl.textContent = "Something went wrong. Please try again.";
          messageEl.classList.remove("text-green-600", "dark:text-green-400");
          messageEl.classList.add("text-red-500");
          clearTimeout(collapseTimeout);
        } finally {
          spinner.classList.add("hidden");
        }
      });
    };

    // Start the setup process
    setupForm();
  });

  // Also try to set up immediately in case DOM is already loaded
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    const form = document.getElementById("emailForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const messageEl = document.getElementById("submitMessage");
        const formInputs = document.getElementById("formInputs");
        const spinner = document.getElementById("loadingSpinner");

        // Store the current form height before any changes
        const formHeight = form.offsetHeight;

        // Ensure the form has a fixed height to start with
        form.style.height = `${formHeight}px`;

        // Show spinner
        spinner.classList.remove("hidden");

        // Prepare the success message - make it more visible
        messageEl.textContent = "✓ Thanks for subscribing!";
        messageEl.classList.remove("text-red-500");
        messageEl.classList.add("text-green-600", "dark:text-green-400");

        // Apply transitions to prevent jumps
        formInputs.style.opacity = "0";

        // Variable to store the collapse timeout so we can clear it if needed
        let collapseTimeout;

        // Immediately hide inputs and show success message for instant feedback
        setTimeout(() => {
          // Hide inputs and show message
          formInputs.classList.add("hidden");
          messageEl.classList.remove("hidden");
          messageEl.classList.add("flex");
          messageEl.style.opacity = "1"; // Make visible immediately
          e.target.reset();

          // After 2 seconds, collapse the form vertically
          collapseTimeout = setTimeout(() => {
            // First ensure transition properties are set
            form.style.transition = "all 300ms ease";

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
        }, 50); // Reduced from 200ms to 50ms for more immediate feedback

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: "15116351-6c46-4b5d-8e6c-46533d27743a",
              email: email,
            }),
          });

          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.message || "Submission failed");
          }
        } catch (error) {
          // If submission fails, show error
          messageEl.textContent = "Something went wrong. Please try again.";
          messageEl.classList.remove("text-green-600", "dark:text-green-400");
          messageEl.classList.add("text-red-500");
          clearTimeout(collapseTimeout);
        } finally {
          spinner.classList.add("hidden");
        }
      });
    }
  }
}
