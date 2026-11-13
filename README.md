# ZZGMAIL15 Safe Starter

Starter portal layanan umum. Ini **bukan** sistem pembuatan, penyimpanan, pemeriksaan, atau jual-beli akun Google. Jangan menambahkan field untuk password Gmail, OTP, recovery code, cookies, token, atau kredensial.

## Jalankan lokal
1. Install Node.js 20+
2. Jalankan `npm install`
3. Set environment variable `ADMIN_KEY` ke nilai rahasia yang kuat.
4. Jalankan `npm start`
5. Buka `http://localhost:3000`

## Deploy ke Vercel
Project ini memakai Express server dan memerlukan penyesuaian deployment/serverless sebelum deploy Vercel. Untuk hosting paling sederhana, deploy ke layanan Node.js yang mendukung proses Express persisten. Jangan memasukkan `ADMIN_KEY` ke file frontend atau repository.

## API
- `GET /api/status` — status buka/tutup.
- `POST /api/requests` — pengajuan layanan umum (hanya contact + note; status Pending).
- `POST /api/admin/server` — buka/tutup server, header `x-admin-key`.
- `GET /api/admin/requests` — daftar pengajuan, header `x-admin-key`.
- `GET /api/admin/events` — log buka/tutup, header `x-admin-key`.

## Catatan penting
Penyimpanan contoh ini masih in-memory: data akan hilang saat proses server restart. Untuk produksi, tambahkan database yang aman, autentikasi admin yang benar, rate limiting, HTTPS, audit log, backup, dan kebijakan privasi.
