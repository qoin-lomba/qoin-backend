# 🚀 Qoin Backend — Express + TypeScript

Backend ini dibangun menggunakan Express.js, TypeScript, dan Prisma.

## 📦 Install & Setup

### 1. Clone Repository
```bash
git clone https://github.com/qoin-lomba/qoin-backend.git
cd qoin-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables  
Buat file `.env` lalu isi

```
DATABASE_URL=postgresql://postgres.dhozepbmdljebihgnbsu:bismillahmenang@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.dhozepbmdljebihgnbsu:bismillahmenang@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
SUPABASE_URL=https://dhozepbmdljebihgnbsu.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRob3plcGJtZGxqZWJpaGduYnN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIwMzg4MSwiZXhwIjoyMDc2Nzc5ODgxfQ.KYtA7XQgQsuZI49bPo9ArMOCgIabsHAn-oG46ov0ydg
JWT_SECRET=hadinpramiadigantengbanget
```

## ▶️ Menjalankan Server (Development)
```bash
npm run dev
```


## 📁 Struktur Folder
```
src/
  ├── features/
  ├── middleware/
  ├── models/
  ├── server.ts
  └── shared
  └── app.ts
  └── server.ts
```

