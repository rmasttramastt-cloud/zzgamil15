const form = document.getElementById("requestForm");
const message = document.getElementById("formMsg");

if (form && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent =
      "Layanan belum aktif. Silakan hubungi admin.";
    message.style.color = "#ffb45e";
  });
}
