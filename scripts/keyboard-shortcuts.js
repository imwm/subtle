document.addEventListener("keydown", function (event) {
  // Check if 'h' key is pressed (case insensitive)
  if (event.key.toLowerCase() === "h") {
    // Only navigate if we're not already on the home page
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/index.html"
    ) {
      window.location.href = "/";
    }
  }
});
