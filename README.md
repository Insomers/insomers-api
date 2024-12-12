# Capstone2 API

## Deskripsi
Capstone2 API adalah aplikasi Express.js yang menyediakan endpoint untuk autentikasi, profil, kuis, dan informasi.

## Cara Menggunakan

### Instalasi
1. Clone repositori:
   ```bash
   git clone https://github.com/Insomers/insomers-api.git
   cd capstone2
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```

### Menjalankan API
Jalankan server dengan perintah:
```bash
npm start
```
Server akan berjalan di port 3000 atau sesuai konfigurasi `.env`.

## Endpoint Utama
- **GET /**: Verifikasi API berjalan ("api succes").
- **POST /api/auth**: Autentikasi pengguna.
- **GET /home**: Data beranda.
- **GET /quiz**: Data kuis.
- **GET /profile**: Data profil pengguna.
- **GET /information**: Data informasi.

## Contoh Curl
- Verifikasi API:
  ```bash
  curl -X GET http://localhost:3000/
  ```
- Autentikasi:
  ```bash
  curl -X POST http://localhost:3000/api/auth -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpass"}'
  ```

