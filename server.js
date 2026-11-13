const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY;
const appState = { open: false, requests: [], events: [] };

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

function requireAdmin(req, res, next) {
  const supplied = req.get("x-admin-key") || "";
  if (!ADMIN_KEY || !crypto.timingSafeEqual(
    Buffer.from(supplied.padEnd(64, " ").slice(0, 64)),
    Buffer.from(ADMIN_KEY.padEnd(64, " ").slice(0, 64))
  )) return res.status(401).json({ error: "Akses admin ditolak." });
  next();
}

app.get("/api/status", (_req, res) => {
  res.json({ open: appState.open, requestCount: appState.requests.length });
});

// Safe generic service request only. Do not submit Gmail addresses/passwords,
// OTPs, recovery codes, cookies, tokens, or Google account data.
app.post("/api/requests", (req, res) => {
  if (!appState.open) return res.status(503).json({ error: "Layanan sedang ditutup admin." });
  const { contact, note } = req.body || {};
  if (typeof contact !== "string" || contact.trim().length < 3 ||
      typeof note !== "string" || note.trim().length < 5) {
    return res.status(400).json({ error: "Isi kontak dan keterangan layanan yang sah." });
  }
  const item = {
    id: crypto.randomUUID(),
    contact: contact.trim().slice(0, 100),
    note: note.trim().slice(0, 500),
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  appState.requests.unshift(item);
  res.status(201).json({ message: "Pengajuan tercatat.", request: item });
});

app.get("/api/admin/requests", requireAdmin, (_req, res) => {
  res.json({ requests: appState.requests });
});

app.post("/api/admin/server", requireAdmin, (req, res) => {
  if (typeof req.body?.open !== "boolean") return res.status(400).json({ error: "Nilai open harus boolean." });
  appState.open = req.body.open;
  appState.events.unshift({ action: appState.open ? "SERVER_DIBUKA" : "SERVER_DITUTUP", at: new Date().toISOString() });
  res.json({ open: appState.open });
});

app.get("/api/admin/events", requireAdmin, (_req, res) => res.json({ events: appState.events }));

app.listen(PORT, () => console.log(`ZZGMAIL15 safe starter listening on ${PORT}`));
