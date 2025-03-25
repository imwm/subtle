// Function to include HTML components
async function includeHTML() {
  const elements = document.getElementsByTagName("*");
  for (const el of elements) {
    const file = el.getAttribute("include-html");
    if (file) {
      try {
        const response = await fetch(file);
        const html = await response.text();
        el.innerHTML = html;
        el.removeAttribute("include-html");
      } catch (error) {
        console.error(`Error loading ${file}:`, error);
      }
    }
  }

  // After all components are loaded, initialize handlers and remove loading class
  initializeHandlers();

  // Update the current year in the footer
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  setTimeout(() => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  }, 100);
}

// Function to collapse the intro box
function collapseIntroBox() {
  const introBox = document.getElementById("introBox");
  const introBoxContent = document.getElementById("introBoxContent");
  const introBoxHeader = document.getElementById("introBoxHeader");

  if (introBox && introBoxContent && introBoxHeader) {
    // Store the current height for animation
    const currentHeight = introBoxContent.offsetHeight;
    introBoxContent.style.height = currentHeight + "px";
    introBoxContent.style.overflow = "hidden";
    introBoxContent.style.transition =
      "height 300ms ease-out, opacity 300ms ease-out";

    // Trigger reflow
    introBoxContent.offsetHeight;

    // Collapse content
    introBoxContent.style.height = "0";
    introBoxContent.style.opacity = "0";

    // After animation, hide content completely
    setTimeout(() => {
      introBoxHeader.classList.remove("hidden");
      introBoxHeader.style.display = "flex";
      introBoxHeader.classList.add("w-full");
      introBoxHeader.classList.add("opacity-100");
      introBoxContent.style.display = "none";
    }, 300);
  }
}

// Function to expand the intro box
function expandIntroBox() {
  const introBox = document.getElementById("introBox");
  const introBoxContent = document.getElementById("introBoxContent");
  const introBoxHeader = document.getElementById("introBoxHeader");
  const formInputs = document.getElementById("formInputs");

  if (introBox && introBoxContent && introBoxHeader) {
    // Hide header immediately
    introBoxHeader.classList.add("hidden");
    introBoxHeader.style.display = "none";

    // Reset display and get natural height
    introBoxContent.style.display = "flex";
    introBoxContent.style.height = "";
    introBoxContent.style.opacity = "";
    const targetHeight = introBoxContent.offsetHeight;

    // Set initial state for animation
    introBoxContent.style.height = "200px";
    introBoxContent.style.opacity = "0";
    introBoxContent.style.overflow = "hidden";
    introBoxContent.style.transition =
      "height 300ms ease-out, opacity 300ms ease-out";

    // Trigger reflow
    introBoxContent.offsetHeight;

    // Expand content
    introBoxContent.style.height = targetHeight + "px";
    introBoxContent.style.opacity = "1";
    formInputs.style.opacity = "1";

    // After animation, reset height to allow dynamic content
    setTimeout(() => {
      introBoxContent.style.height = "";
      introBoxContent.style.overflow = "";
    }, 300);
  }
}

// Function to handle intro box close button
function handleIntroBoxClose() {
  const closeButton = document.getElementById("closeIntroBox");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      collapseIntroBox();
      localStorage.setItem("introBoxCollapsed", "true");
    });
  }
}

// Function to handle intro box header click
function handleIntroBoxHeader() {
  const header = document.getElementById("introBoxHeader");
  if (header) {
    header.addEventListener("click", () => {
      expandIntroBox();
      localStorage.setItem("introBoxCollapsed", "false");
    });
  }
}

// Function to handle email form submission
function handleEmailForm() {
  const emailForm = document.getElementById("emailForm");
  if (emailForm) {
    emailForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formInputs = document.getElementById("formInputs");
      const submitMessage = document.getElementById("submitMessage");
      const loadingSpinner = document.getElementById("loadingSpinner");

      // Show loading state
      loadingSpinner.classList.remove("hidden");
      formInputs.style.opacity = "0.5";

      try {
        // Your existing form submission logic here
        // After successful submission:
        submitMessage.textContent = "Thanks for signing up!";
        submitMessage.classList.remove("hidden");
        formInputs.style.opacity = "0";

        // Collapse the intro box after a short delay
        setTimeout(() => {
          collapseIntroBox();
          localStorage.setItem("introBoxCollapsed", "true");
        }, 1500);
      } catch (error) {
        console.error("Error submitting form:", error);
        submitMessage.textContent = "Error submitting form. Please try again.";
        submitMessage.classList.remove("hidden");
        formInputs.style.opacity = "1";
      } finally {
        loadingSpinner.classList.add("hidden");
      }
    });
  }
}

// Function to initialize all handlers and check localStorage
function initializeHandlers() {
  // Check if intro box should be collapsed
  const introBoxCollapsed = localStorage.getItem("introBoxCollapsed");
  if (introBoxCollapsed === "true") {
    const introBoxContent = document.getElementById("introBoxContent");
    const introBoxHeader = document.getElementById("introBoxHeader");
    if (introBoxContent && introBoxHeader) {
      introBoxContent.style.display = "none";
      introBoxHeader.classList.remove("hidden");
      introBoxHeader.style.display = "flex";
      introBoxHeader.style.opacity = "1";
    }
  }

  // Initialize event handlers
  handleIntroBoxClose();
  handleIntroBoxHeader();
  handleEmailForm();
}

// Initialize page on load
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body
  document.body.classList.add("loading");

  // Start component loading
  includeHTML();
});
