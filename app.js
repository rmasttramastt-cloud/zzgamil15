
const form = document.getElementById("requestForm");
const message = document.getElementById("formMsg");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    message.textContent =
      "Pengajuan belum aktif. Server ZZGMAIL15 belum selesai dipasang.";

    message.style.color = "#ffb45e";
  });
}
