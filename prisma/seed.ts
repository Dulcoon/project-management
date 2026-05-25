import pg from "pg";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  colSpan: 1 | 2;
};

type ImpactMetric = {
  value: string;
  label: string;
  subtext: string;
};

type Project = {
  slug: string;
  title: string;
  desc: string;
  longDesc: string;
  tech: string[];
  role: string;
  year: number;
  status: string;
  features: string[];
  images: string[];
  demo: string;
  github: string;
  category: string;
  mission: string;
  client: string;
  tags: string[];
  overview: string[];
  impactMetric: ImpactMetric;
  featureList: FeatureItem[];
};

const projects: Project[] = [
  {
    slug: "paulusconnect",
    title: "Paulus Connect",
    desc: "Church service & community mobile app",
    longDesc:
      "PaulusConnect is a mobile application designed to help church members access services, sacrament registrations, and event notifications digitally.",
    tech: ["Flutter", "Laravel", "Firebase", "MySQL"],
    role: "Full Stack Web & Mobile Developer",
    year: 2025,
    status: "Live",
    features: [
      "Authentication with Laravel Sanctum",
      "Sacrament & community registration",
      "Real-time notification using Firebase Cloud Messaging",
      "Admin dashboard for approval system",
    ],
    images: [
      "/projects/paulusconnect/1.png",
      "/projects/paulusconnect/2.png",
      "/projects/paulusconnect/3.png",
      "/projects/paulusconnect/4.png",
      "/projects/paulusconnect/5.png",
      "/projects/paulusconnect/6.png",
    ],
    demo: "https://paulus-connect.homeliving.co.id/",
    github: "https://github.com/Dulcoon/paulus-connect-backend",
    category: "Mobile App",
    mission: "Menghubungkan jemaat dengan layanan gereja secara digital melalui aplikasi mobile yang terintegrasi.",
    client: "Gereja Paulus",
    tags: ["flutter", "laravel", "firebase", "mobile", "church", "registration"],
    overview: [
      "PaulusConnect adalah aplikasi mobile yang dirancang untuk membantu jemaat gereja mengakses layanan, registrasi sakramen, dan notifikasi acara secara digital.",
      "Aplikasi ini menggantikan proses manual dengan solusi digital yang terpusat, memudahkan komunikasi antara admin gereja dan jemaat.",
    ],
    impactMetric: { value: "200+", label: "Active Users", subtext: "Jemaat terdaftar" },
    featureList: [
      { icon: "app_registration", title: "Registrasi Sakramen", description: "Pendaftaran sakramen dan kegiatan gereja secara online.", colSpan: 2 },
      { icon: "notifications_active", title: "Notifikasi Real-time", description: "Notifikasi otomatis menggunakan Firebase Cloud Messaging.", colSpan: 1 },
      { icon: "verified_user", title: "Autentikasi Aman", description: "Login aman dengan Laravel Sanctum.", colSpan: 1 },
      { icon: "dashboard", title: "Admin Dashboard", description: "Dashboard untuk manajemen data dan approval sistem.", colSpan: 2 },
    ],
  },
  {
    slug: "strive-to-high",
    title: "Strive to High",
    desc: "Inclusive training & job readiness application for people with disabilities",
    longDesc:
      "Strive to High is an interactive training application designed to improve psychological readiness, digital skills, and job preparedness for people with intellectual disabilities and Down syndrome. The app integrates daily missions, point-based leaderboards, AR-based interview simulations, and live interaction training to support inclusive workforce development.",
    tech: [
      "Flutter",
      "Laravel",
      "MySQL",
      "REST API",
      "AR.js",
      "Grok API (Conversational AI)",
      "Text-to-Speech",
    ],
    role: "Full Stack Web & Mobile Developer",
    year: 2025,
    status: "Prototype (PKM Project, Website Already Live)",
    features: [
      "Daily mission system with point & level progression",
      "Leaderboard to boost motivation and competitiveness",
      "AR-based job interview simulation with virtual interviewer",
      "Live streaming simulation with AI-generated chat interaction",
      "Admin approval system for mission submissions",
      "Document generator (CV, portfolio, job application)",
      "Push notification system for mission & training updates",
    ],
    images: [
      "/projects/strive-to-high/1.png",
      "/projects/strive-to-high/2.png",
      "/projects/strive-to-high/3.png",
    ],
    demo: "https://strivetohigh.org",
    github: "https://github.com/Dulcoon/strive-to-high-app",
    category: "Mobile App",
    mission: "Menyediakan platform pelatihan inklusif yang mempersiapkan penyandang disabilitas intelektual untuk memasuki dunia kerja.",
    client: "PKM Project",
    tags: ["flutter", "laravel", "accessibility", "training", "ar", "ai"],
    overview: [
      "Strive to High adalah aplikasi pelatihan interaktif yang dirancang untuk meningkatkan kesiapan psikologis, keterampilan digital, dan kesiapan kerja bagi penyandang disabilitas intelektual dan Down syndrome.",
      "Aplikasi ini menggabungkan misi harian, leaderboard berbasis poin, simulasi wawancara AR, dan pelatihan interaksi langsung untuk mendukung pengembangan tenaga kerja inklusif.",
    ],
    impactMetric: { value: "50+", label: "Active Trainees", subtext: "Peserta pelatihan" },
    featureList: [
      { icon: "psychology", title: "Misi Harian & Level", description: "Sistem misi harian dengan progres poin dan level.", colSpan: 1 },
      { icon: "leaderboard", title: "Leaderboard", description: "Peringkat untuk meningkatkan motivasi dan kompetisi sehat.", colSpan: 1 },
      { icon: "view_in_ar", title: "Simulasi Wawancara AR", description: "Simulasi wawancara kerja dengan pewawancara virtual berbasis AR.", colSpan: 2 },
      { icon: "smart_toy", title: "AI Chat Interaction", description: "Simulasi live streaming dengan interaksi chat berbasis AI.", colSpan: 1 },
      { icon: "description", title: "Generator Dokumen", description: "Generate CV, portofolio, dan surat lamaran kerja.", colSpan: 1 },
    ],
  },
  {
    slug: "ecommerce-app",
    title: "Homeliving E-Commerce App",
    desc: "Full stack furniture shopping platform",
    longDesc:
      "A modern e-commerce platform with product management, shopping cart, checkout system, and admin dashboard.",
    tech: ["Blade", "Laravel", "MySQL", "vite.js", "tailwindcss"],
    role: "Full Stack Developer",
    year: 2023,
    status: "Prototype",
    features: [
      "Product & category management",
      "Shopping cart & checkout flow",
      "Authentication & authorization",
      "Admin dashboard",
    ],
    images: [
      "/projects/ecommerce/1.png",
      "/projects/ecommerce/2.png",
      "/projects/ecommerce/3.png",
      "/projects/ecommerce/4.png",
    ],
    demo: "https://homeliving.co.id/",
    github: "https://github.com/Dulcoon/web_harum_sari",
    category: "Web App",
    mission: "Menyediakan platform belanja furniture online yang cepat, aman, dan mudah digunakan.",
    client: "Homeliving",
    tags: ["laravel", "blade", "mysql", "ecommerce", "furniture"],
    overview: [
      "Platform e-commerce modern untuk penjualan furniture dengan sistem manajemen produk, keranjang belanja, dan checkout yang terintegrasi.",
      "Dilengkapi dengan dashboard admin untuk mengelola produk, kategori, dan pesanan.",
    ],
    impactMetric: { value: "100+", label: "Products Listed", subtext: "Produk furniture" },
    featureList: [
      { icon: "inventory", title: "Manajemen Produk", description: "Kelola produk dan kategori dengan mudah.", colSpan: 1 },
      { icon: "shopping_cart", title: "Keranjang Belanja", description: "Sistem keranjang dan checkout yang lancar.", colSpan: 1 },
      { icon: "admin_panel_settings", title: "Admin Dashboard", description: "Dashboard untuk manajemen toko.", colSpan: 2 },
    ],
  },
  {
    slug: "villa-booking-app",
    title: "Holiday Bali Villa Booking Platform",
    desc: "Luxury villa booking website for Bali destinations",
    longDesc:
      "A modern villa booking platform designed to showcase and manage private villas across Bali. The platform features elegant UI, villa listings with detailed information, image galleries, and an admin panel for managing villa data and images. Built with scalability in mind for future booking and availability features.",
    tech: ["Laravel 11", "Blade", "MySQL", "Tailwind CSS", "Vite"],
    role: "Full Stack Developer",
    year: 2025,
    status: "Live on homeliving's subdomain",
    features: [
      "Villa listing with modern horizontal card design",
      "Detailed villa pages with image gallery",
      "Admin dashboard for villa management (CRUD)",
      "Multiple villa images management",
      "Flexible facilities system using JSON field",
      "SEO-friendly slug-based routing",
      "Responsive and elegant UI design",
    ],
    images: [
      "/projects/villa/1.png",
      "/projects/villa/2.png",
      "/projects/villa/3.png",
      "/projects/villa/4.png",
      "/projects/villa/5.png",
      "/projects/villa/6.png",
      "/projects/villa/7.png",
    ],
    demo: "https://holidaybalivilla.homeliving.co.id/",
    github: "https://github.com/Dulcoon/holidaybalivilla",
    category: "Web App",
    mission: "Menyediakan platform pemesanan villa mewah di Bali dengan pengalaman browsing yang elegan dan informatif.",
    client: "Homeliving",
    tags: ["laravel", "blade", "mysql", "booking", "bali", "tourism"],
    overview: [
      "Platform pemesanan villa modern yang menampilkan dan mengelola villa-villa mewah di seluruh Bali.",
      "Menampilkan listing villa dengan informasi detail, galeri gambar, dan panel admin untuk mengelola data villa secara efisien.",
    ],
    impactMetric: { value: "15+", label: "Villas Listed", subtext: "Villa terdaftar" },
    featureList: [
      { icon: "villa", title: "Listing Villa", description: "Tampilan villa dengan desain kartu horizontal modern.", colSpan: 2 },
      { icon: "photo_library", title: "Galeri Gambar", description: "Galeri gambar detail untuk setiap villa.", colSpan: 1 },
      { icon: "dashboard", title: "Admin Panel", description: "CRUD untuk manajemen villa dan fasilitas.", colSpan: 1 },
    ],
  },
  {
    slug: "sitika-app",
    title: "siTika – Sistem Informasi HIMATIKA",
    desc: "Mobile-based inventory and meeting management system",
    longDesc:
      "siTika is a mobile application developed to support inventory management, meeting scheduling, and QR-based attendance for HIMATIKA UTY. The system replaces manual processes with a real-time, centralized solution using Firebase, enabling efficient borrowing management, meeting coordination, and administrative monitoring.",
    tech: [
      "Flutter",
      "Firebase Authentication",
      "Cloud Firestore",
      "Firebase Cloud Messaging",
      "QR Code",
    ],
    role: "Fullstack Mobile Developer",
    year: 2025,
    status: "Production / Academic Project",
    features: [
      "Role-based authentication (Admin & User)",
      "Inventory management and borrowing system",
      "QR Code-based meeting attendance",
      "Real-time borrowing status tracking",
      "Meeting and event scheduling",
      "Admin dashboard for system management",
      "Real-time notifications using FCM",
      "Modern and responsive UI design",
    ],
    images: [
      "/projects/sitika/1.png",
      "/projects/sitika/2.png",
      "/projects/sitika/3.png",
      "/projects/sitika/4.png",
      "/projects/sitika/5.png",
    ],
    demo: "",
    github: "",
    category: "Mobile App",
    mission: "Mendigitalisasi manajemen inventaris dan pertemuan HIMATIKA UTY dengan sistem real-time berbasis Firebase.",
    client: "HIMATIKA UTY",
    tags: ["flutter", "firebase", "qr-code", "inventory", "meeting", "academic"],
    overview: [
      "siTika adalah aplikasi mobile untuk mendukung manajemen inventaris, penjadwalan pertemuan, dan absensi berbasis QR untuk HIMATIKA UTY.",
      "Sistem ini menggantikan proses manual dengan solusi real-time terpusat menggunakan Firebase, memungkinkan pengelolaan peminjaman, koordinasi pertemuan, dan monitoring administrasi yang efisien.",
    ],
    impactMetric: { value: "100+", label: "Active Users", subtext: "Mahasiswa HIMATIKA" },
    featureList: [
      { icon: "admin_panel_settings", title: "Role-based Auth", description: "Autentikasi berbasis peran (Admin & User).", colSpan: 1 },
      { icon: "inventory", title: "Manajemen Inventaris", description: "Sistem peminjaman dan pelacakan barang.", colSpan: 1 },
      { icon: "qr_code_scanner", title: "Absensi QR Code", description: "Absensi pertemuan berbasis scan QR Code.", colSpan: 1 },
      { icon: "notifications_active", title: "Notifikasi Real-time", description: "Notifikasi menggunakan Firebase Cloud Messaging.", colSpan: 1 },
      { icon: "calendar_month", title: "Jadwal Pertemuan", description: "Penjadwalan dan pengelolaan acara himpunan.", colSpan: 2 },
    ],
  },
];

async function main() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await client.query(
      `INSERT INTO "User" (id, email, name, password)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      ["admin-001", "admin@projectmgmt.com", "Admin", hashedPassword]
    );

    function toPgArray(arr: string[]): string {
      const escaped = arr.map((s) => {
        const escaped = s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      return `{${escaped.join(",")}}`;
    }

    for (const p of projects) {
      await client.query(
        `INSERT INTO "Project" (
          id, slug, title, "desc", "longDesc", tech, role, year, status,
          features, images, demo, github,
          category, mission, client, tags, overview, "impactMetric", "featureList",
          "createdAt", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13,
          $14, $15, $16, $17, $18::jsonb, $19::jsonb, $20::jsonb,
          NOW(), NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          "desc" = EXCLUDED."desc",
          "longDesc" = EXCLUDED."longDesc",
          tech = EXCLUDED.tech,
          role = EXCLUDED.role,
          year = EXCLUDED.year,
          status = EXCLUDED.status,
          features = EXCLUDED.features,
          images = EXCLUDED.images,
          demo = EXCLUDED.demo,
          github = EXCLUDED.github,
          category = EXCLUDED.category,
          mission = EXCLUDED.mission,
          client = EXCLUDED.client,
          tags = EXCLUDED.tags,
          overview = EXCLUDED.overview,
          "impactMetric" = EXCLUDED."impactMetric",
          "featureList" = EXCLUDED."featureList",
          "updatedAt" = NOW()`,
        [
          crypto.randomUUID(),
          p.slug,
          p.title,
          p.desc,
          p.longDesc,
          toPgArray(p.tech),
          p.role,
          p.year,
          p.status,
          toPgArray(p.features),
          toPgArray(p.images),
          p.demo || null,
          p.github || null,
          p.category,
          p.mission,
          p.client,
          toPgArray(p.tags),
          JSON.stringify(p.overview),
          JSON.stringify(p.impactMetric),
          JSON.stringify(p.featureList),
        ]
      );
    }

    await client.query("COMMIT");
    console.log("Seed completed:");
    console.log("- Admin user: admin@projectmgmt.com / admin123");
    console.log(`- ${projects.length} projects seeded`);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
