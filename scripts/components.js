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

  // After all components are loaded, remove loading class
  setTimeout(() => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  }, 100);
}

// Initialize page on load
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body
  document.body.classList.add("loading");

  // Start component loading
  includeHTML();
});
