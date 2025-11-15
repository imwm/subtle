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
          // Try AJAX endpoint first (was working before, emails were being sent)
          // Even if CORS error appears in console, the request may still succeed server-side
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

          if (!response.ok) {
            throw new Error("Submission failed");
          }
        } catch (error) {
          // If fetch fails (likely due to CORS), try iframe fallback
          // FormSubmit may still process the request even with CORS error
          try {
            const iframe = document.createElement("iframe");
            iframe.name = "hiddenFrame_" + Date.now();
            iframe.style.display = "none";
            document.body.appendChild(iframe);

            const tempForm = document.createElement("form");
            tempForm.method = "POST";
            tempForm.action = "https://formsubmit.co/hi@subtle.so";
            tempForm.target = iframe.name;
            tempForm.style.display = "none";
            tempForm.enctype = "application/x-www-form-urlencoded";

            const emailInput = document.createElement("input");
            emailInput.type = "hidden";
            emailInput.name = "email";
            emailInput.value = email;

            const nextInput = document.createElement("input");
            nextInput.type = "hidden";
            nextInput.name = "_next";
            nextInput.value = window.location.href;

            tempForm.appendChild(emailInput);
            tempForm.appendChild(nextInput);
            document.body.appendChild(tempForm);
            tempForm.submit();

            setTimeout(() => {
              if (document.body.contains(tempForm)) {
                document.body.removeChild(tempForm);
              }
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 2000);
          } catch (fallbackError) {
            // If both methods fail, show error
            messageEl.textContent = "Something went wrong. Please try again.";
            messageEl.classList.remove("text-green-600", "dark:text-green-400");
            messageEl.classList.add("text-red-500");
            clearTimeout(collapseTimeout);
          }
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
          // Try AJAX endpoint first (was working before, emails were being sent)
          // Even if CORS error appears in console, the request may still succeed server-side
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

          if (!response.ok) {
            throw new Error("Submission failed");
          }
        } catch (error) {
          // If fetch fails (likely due to CORS), try iframe fallback
          // FormSubmit may still process the request even with CORS error
          try {
            const iframe = document.createElement("iframe");
            iframe.name = "hiddenFrame_" + Date.now();
            iframe.style.display = "none";
            document.body.appendChild(iframe);

            const tempForm = document.createElement("form");
            tempForm.method = "POST";
            tempForm.action = "https://formsubmit.co/hi@subtle.so";
            tempForm.target = iframe.name;
            tempForm.style.display = "none";
            tempForm.enctype = "application/x-www-form-urlencoded";

            const emailInput = document.createElement("input");
            emailInput.type = "hidden";
            emailInput.name = "email";
            emailInput.value = email;

            const nextInput = document.createElement("input");
            nextInput.type = "hidden";
            nextInput.name = "_next";
            nextInput.value = window.location.href;

            tempForm.appendChild(emailInput);
            tempForm.appendChild(nextInput);
            document.body.appendChild(tempForm);
            tempForm.submit();

            setTimeout(() => {
              if (document.body.contains(tempForm)) {
                document.body.removeChild(tempForm);
              }
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 2000);
          } catch (fallbackError) {
            // If both methods fail, show error
            messageEl.textContent = "Something went wrong. Please try again.";
            messageEl.classList.remove("text-green-600", "dark:text-green-400");
            messageEl.classList.add("text-red-500");
            clearTimeout(collapseTimeout);
          }
        } finally {
          spinner.classList.add("hidden");
        }
      });
    }
  }
}
