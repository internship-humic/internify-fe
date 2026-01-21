# Internify - Sistem Manajemen Magang Humic Engineering

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

Platform web untuk mengelola program magang, lowongan kerja, produk research, partnership, FAQ, dan feedback untuk Humic Engineering. Aplikasi ini menyediakan antarmuka yang user-friendly untuk calon magang dan dashboard administrasi yang lengkap untuk mengelola semua aspek program magang.

---

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur-Fitur](#fitur-fitur)
  - [Fitur untuk Pengguna Umum](#fitur-untuk-pengguna-umum)
  - [Fitur untuk Administrator](#fitur-untuk-administrator)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Struktur Proyek](#struktur-proyek)
- [Scripts yang Tersedia](#scripts-yang-tersedia)
- [Halaman dan Routing](#halaman-dan-routing)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)
- [Catatan Tambahan](#catatan-tambahan)
- [Lisensi](#lisensi)

---

## Tentang Proyek

**Internify** adalah sistem manajemen magang yang dikembangkan untuk Humic Engineering. Aplikasi ini memungkinkan:

- **Calon Magang**: Mencari dan mendaftar ke lowongan magang yang tersedia, melihat detail produk research, dan mengirim feedback
- **Administrator**: Mengelola semua aspek program magang termasuk lowongan, pendaftaran, produk research, partnership, FAQ, dan feedback melalui dashboard yang komprehensif

Aplikasi ini dibangun dengan teknologi modern untuk memberikan pengalaman pengguna yang optimal dan performa yang tinggi.

## Fitur-Fitur

### Fitur untuk Pengguna Umum

- **Landing Page**: Halaman utama dengan informasi tentang program magang, testimoni, dan FAQ
- **Browse Internships**: Pencarian dan penelusuran lowongan magang yang tersedia
- **Internship Details**: Detail lengkap setiap lowongan magang
- **Registration**: Pendaftaran magang dengan validasi reCAPTCHA
- **Product Research**: Lihat produk research dan detailnya
- **About Us**: Informasi tentang perusahaan dan partnership
- **Our Developer**: Halaman tentang tim developer
- **FAQ**: Frequently Asked Questions
- **Feedback**: Testimoni dari magang sebelumnya

### Fitur untuk Administrator

- **Dashboard**: Statistik lengkap dengan visualisasi data menggunakan chart:
  - Total pendaftar, diterima, ditolak, dan sedang diproses
  - Statistik berdasarkan posisi
  - Statistik berdasarkan universitas
  - Statistik berdasarkan negara
  - Grafik penerimaan
  
- **Manajemen Lowongan**:
  - Daftar semua lowongan
  - Tambah lowongan baru
  - Edit lowongan
  - Hapus lowongan
  
- **Manajemen Pendaftaran**:
  - Daftar semua pendaftar
  - Detail pendaftar
  - Update status pendaftaran (diterima/ditolak/diproses)
  - Export data pendaftar
  
- **Manajemen Produk Research**:
  - Daftar produk research
  - Tambah produk baru
  - Edit produk
  - Hapus produk
  
- **Manajemen Partnership**:
  - Daftar partnership
  - Tambah partnership baru
  - Edit partnership
  - Hapus partnership
  
- **Manajemen FAQ**:
  - Daftar FAQ
  - Tambah FAQ baru
  - Edit FAQ
  - Hapus FAQ
  
- **Manajemen Feedback**:
  - Daftar feedback
  - Tambah feedback baru
  - Edit feedback
  - Hapus feedback
  
- **Manajemen Konten**: Edit konten aktif

## Teknologi yang Digunakan

### Frontend Framework & Tools
- **React 18.2.0**: Library JavaScript untuk membangun user interface
- **TypeScript 5.9.3**: Superset JavaScript dengan static typing
- **Vite 6.3.5**: Build tool dan development server yang cepat

### Styling
- **Tailwind CSS 4.1.6**: Utility-first CSS framework untuk styling yang cepat

### Routing
- **React Router DOM 7.6.0**: Routing library untuk navigasi halaman

### Data Visualization
- **Recharts 3.4.1**: Library untuk membuat chart dan visualisasi data

### Rich Text Editor
- **Froala Editor 4.5.2**: WYSIWYG editor untuk konten yang kaya
- **TipTap 2.23.0**: Editor teks modern dan extensible

### HTTP Client
- **Axios 1.10.0**: HTTP client untuk melakukan request ke API

### Security
- **React Google reCAPTCHA 3.1.0**: Integrasi Google reCAPTCHA untuk validasi form

### Icons
- **Lucide React 0.553.0**: Icon library yang modern dan ringan
- **React Icons 5.5.0**: Popular icon library untuk React

### Development Tools
- **ESLint**: Linting tool untuk menjaga kualitas kode
- **TypeScript ESLint**: ESLint rules untuk TypeScript

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (versi 18 atau lebih tinggi)
- **npm** (versi 9 atau lebih tinggi) atau **yarn**
- Akses ke backend API Internify
- Google reCAPTCHA Site Key (untuk fitur pendaftaran)

## Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd Internify_Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Buat file `.env` di root directory dengan konten berikut:
   ```env
   VITE_API_BASE_URL=https://internify-ruddy.vercel.app
   VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
   ```
   
   **Catatan**: Ganti `your-recaptcha-site-key` dengan Google reCAPTCHA Site Key Anda.

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   
   Aplikasi akan berjalan di `http://localhost:5173` (atau port yang ditampilkan di terminal)

## Konfigurasi

### Environment Variables

Aplikasi menggunakan environment variables berikut:

| Variable | Deskripsi | Default | Wajib |
|----------|-----------|---------|-------|
| `VITE_API_BASE_URL` | URL base untuk backend API | `https://internify-ruddy.vercel.app` | Ya |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA Site Key | - | Ya (untuk pendaftaran) |

### Backend API

Aplikasi ini memerlukan backend API yang menyediakan endpoint berikut:

- **Authentication API**: `/auth-api/login`, `/auth-api/me`
- **Lowongan API**: `/lowongan-magang-api/*`
- **Lamaran API**: `/lamaran-magang-api/*`
- **Research API**: `/hasil-research-api/*`
- **Partnership API**: `/partnership-api/*`
- **FAQ API**: `/faq-api/*`
- **Feedback API**: `/feedback-api/*`
- **Batch API**: `/batch-api`

Pastikan backend API sudah berjalan dan dapat diakses sebelum menggunakan aplikasi.

## Struktur Proyek

```
Internify_Project/
├── public/                 # Static assets
│   ├── fonts/             # Font files
│   └── vite.svg
├── src/
│   ├── assets/            # Image assets
│   ├── Layout/            # Layout components
│   │   ├── Faq.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavbarAdmin.tsx
│   │   └── SidebarAdmin.tsx
│   ├── Pages/             # Page components
│   │   ├── utils/
│   │   │   └── PrivateRoute.tsx
│   │   ├── AboutUs.tsx
│   │   ├── AddFAQ.tsx
│   │   ├── AddFeedback.tsx
│   │   ├── AddPartnershipAdmin.tsx
│   │   ├── AddProduct.tsx
│   │   ├── AddProductHumic.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DetailsProduct.tsx
│   │   ├── EditFAQ.tsx
│   │   ├── EditFeedback.tsx
│   │   ├── EditKontenAdmin.tsx
│   │   ├── EditLowongan.tsx
│   │   ├── EditPartnerships.tsx
│   │   ├── EditProductHumic.tsx
│   │   ├── InternshipDetails.tsx
│   │   ├── InternshipDetailsAdmin.tsx
│   │   ├── InternshipList.tsx
│   │   ├── Internships.tsx
│   │   ├── Landing.tsx
│   │   ├── ListFaq.tsx
│   │   ├── ListFeedback.tsx
│   │   ├── ListLowongan.tsx
│   │   ├── ListProduct.tsx
│   │   ├── LoginAdmin.tsx
│   │   ├── OurDeveloper.tsx
│   │   ├── PartnershipsList.tsx
│   │   ├── RegisterDone.tsx
│   │   └── RegisterInternships.tsx
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main App component dengan routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── dist/                  # Build output
├── .env                  # Environment variables (buat sendiri)
├── eslint.config.js      # ESLint configuration
├── package.json          # Dependencies dan scripts
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # TypeScript config untuk app
├── tsconfig.node.json    # TypeScript config untuk node
├── vercel.json           # Vercel deployment configuration
└── vite.config.ts        # Vite configuration
```

### Organisasi Komponen

- **Layout/**: Komponen layout yang digunakan di berbagai halaman (Navbar, Footer, Sidebar, dll)
- **Pages/**: Komponen halaman utama aplikasi
- **Pages/utils/**: Utility components seperti PrivateRoute untuk proteksi route
- **assets/**: File gambar dan asset lainnya
- **types/**: Type definitions untuk TypeScript

## Scripts yang Tersedia

### Development
```bash
npm run dev
```
Menjalankan development server dengan hot module replacement (HMR).

### Build
```bash
npm run build
```
Membangun aplikasi untuk production. Output akan berada di folder `dist/`.

### Lint
```bash
npm run lint
```
Menjalankan ESLint untuk mengecek kualitas kode.

### Preview
```bash
npm run preview
```
Preview production build secara lokal sebelum deploy.

## Halaman dan Routing

### Public Routes (Tidak Memerlukan Authentication)

| Route | Komponen | Deskripsi |
|-------|----------|-----------|
| `/` | `Landing` | Halaman utama dengan informasi program magang |
| `/about-us` | `AboutUs` | Halaman tentang perusahaan, produk research, dan partnership |
| `/internships` | `Internships` | Daftar semua lowongan magang yang tersedia |
| `/details/:id` | `InternshipDetails` | Detail lengkap lowongan magang |
| `/register-intern/:id` | `RegisterInternships` | Form pendaftaran magang |
| `/register-done` | `RegisterDone` | Halaman konfirmasi setelah pendaftaran |
| `/our-developer` | `OurDeveloper` | Halaman tentang tim developer |
| `/details-product/:id` | `DetailsProduct` | Detail produk research |
| `/login-admin` | `LoginAdmin` | Halaman login admin |

### Protected Routes (Memerlukan Authentication)

Semua route di bawah ini dilindungi oleh `PrivateRoute` dan memerlukan token authentication:

| Route | Komponen | Deskripsi |
|-------|----------|-----------|
| `/dashboard` | `Dashboard` | Dashboard admin dengan statistik dan chart |
| `/internships-list` | `InternshipList` | Daftar semua pendaftar magang |
| `/internships-details-admin/:id` | `InternshipDetailsAdmin` | Detail pendaftar untuk admin |
| `/lowongan-list` | `ListLowongan` | Daftar semua lowongan |
| `/edit-lowongan/:id` | `EditLowongan` | Edit lowongan |
| `/add-product-admin` | `AddProduct` | Tambah lowongan baru |
| `/product-list` | `ListProduct` | Daftar produk research |
| `/add-product-humic` | `AddProductHumic` | Tambah produk research baru |
| `/edit-product-humic/:id` | `EditProductHumic` | Edit produk research |
| `/partnership-admin` | `PartnershipsList` | Daftar partnership |
| `/add-partnership` | `AddPartnershipAdmin` | Tambah partnership baru |
| `/edit-partnership/:id` | `EditPartnerships` | Edit partnership |
| `/faq-list` | `ListFaq` | Daftar FAQ |
| `/add-faq` | `AddFaq` | Tambah FAQ baru |
| `/edit-faq/:id` | `EditFaq` | Edit FAQ |
| `/feedback-list` | `ListFeedback` | Daftar feedback |
| `/add-feedback` | `AddFeedback` | Tambah feedback baru |
| `/edit-feedback/:id` | `EditFeedback` | Edit feedback |
| `/kontent-aktif/edit/:id` | `EditKontenAdmin` | Edit konten aktif |

## Authentication

Aplikasi menggunakan sistem autentikasi berbasis **token** yang disimpan dalam **cookie**.

### Flow Authentication

1. **Login**: Admin login melalui `/login-admin`
2. **Token Storage**: Token disimpan dalam cookie dengan nama `token`
3. **Protected Routes**: `PrivateRoute` component memeriksa keberadaan token
4. **API Requests**: Token dikirim sebagai Bearer token di header Authorization
5. **Logout**: Token dihapus dari cookie

### PrivateRoute Component

Komponen `PrivateRoute` bertugas:
- Memeriksa keberadaan token di cookie
- Redirect ke halaman login jika token tidak ada
- Render child routes jika token valid

### Token Management

Token diambil dari cookie menggunakan:
```typescript
document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
```

Token dikirim ke API melalui header:
```typescript
headers: {
  Authorization: `Bearer ${token}`
}
```

## Deployment

### Vercel Deployment

Aplikasi ini dikonfigurasi untuk deployment di Vercel. File `vercel.json` sudah disiapkan dengan konfigurasi SPA routing.

#### Langkah-langkah Deployment:

1. **Install Vercel CLI** (opsional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy ke Vercel**
   ```bash
   vercel
   ```
   
   Atau hubungkan repository ke Vercel melalui dashboard.

3. **Setup Environment Variables di Vercel**
   
   Di dashboard Vercel, tambahkan environment variables:
   - `VITE_API_BASE_URL`: URL backend API
   - `VITE_RECAPTCHA_SITE_KEY`: Google reCAPTCHA Site Key

4. **Build Configuration**
   
   Vercel akan otomatis mendeteksi:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Konfigurasi Vercel

File `vercel.json` berisi konfigurasi untuk SPA routing:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Ini memastikan semua route di-handle oleh React Router.

### Environment Variables untuk Production

Pastikan semua environment variables sudah di-set di Vercel dashboard:
- `VITE_API_BASE_URL`
- `VITE_RECAPTCHA_SITE_KEY`

## Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

### Guidelines

- Ikuti coding style yang sudah ada
- Pastikan semua test pass
- Update dokumentasi jika diperlukan
- Commit message yang jelas dan deskriptif

## Catatan Tambahan

- Pastikan backend API sudah berjalan sebelum menggunakan aplikasi
- Google reCAPTCHA diperlukan untuk fitur pendaftaran magang
- Semua gambar dan asset disimpan di backend, frontend hanya menampilkan

## Lisensi

Proyek ini adalah proyek internal untuk Humic Engineering.

---

<div align="center">

**Dikembangkan dengan ❤️ untuk Humic Engineering**

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

</div>