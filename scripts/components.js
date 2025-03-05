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
}
includeHTML(); 