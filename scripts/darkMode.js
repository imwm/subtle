if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
}

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
} 