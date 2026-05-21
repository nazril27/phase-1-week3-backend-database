-- nazril

CREATE TABLE roles (
	id INT PRIMARY KEY,
	nama_role VARCHAR(255)
);

CREATE TABLE karyawan (
	id INT PRIMARY KEY,
	role_id INT,
	nama VARCHAR(255),
	email VARCHAR(255) UNIQUE,
	password VARCHAR(255),
	FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE absensi (
	id INT PRIMARY KEY,
	karyawan_id INT,
	tanggal DATE,
	jam_masuk TIME,
	jam_keluar TIME,
	status CHECK (status IN ('Hadir', 'Sakit', 'Izin', 'Alpha')),
	FOREIGN KEY (karyawan_id) REFERENCES karyawan(id)
);

CREATE TABLE projects (
	id INT PRIMARY KEY,
	manager_id INT,
	nama_project VARCHAR(255),
	budget NUMERIC(15,2),
	tanggal_mulai DATE,
	tanggal_selesai DATE,
	status CHECK (status IN ('Perencanaan', 'Berjalan', 'Selesai', 'Pending')),
	FOREIGN KEY (manager_id) REFERENCES karyawan(id)
);

CREATE TABLE anggota_project (
	id INT PRIMARY KEY,
	project_id INT,
	karyawan_id INT,
	peran_project VARCHAR(255),
	alokasi_gaji NUMERIC(15,2),
	FOREIGN KEY (project_id) REFERENCES projects(id),
	FOREIGN KEY (karyawan_id) REFERENCES karyawan(id)
);

CREATE TABLE tugas (
	id INT PRIMARY KEY,
	project_id INT,
	karyawan_id INT,
	judul_tugas VARCHAR(255),
	deskripsi TEXT,
	status CHECK (status IN ('Pending', 'On Progress', 'Review', 'Selesai')),
	deadline DATETIME,
	FOREIGN KEY (project_id) REFERENCES projects(id),
	FOREIGN KEY (karyawan_id) REFERENCES karyawan(id)
);

INSERT INTO roles (id, nama_role) VALUES 
(1, 'Manager'),
(2, 'Karyawan');

INSERT INTO karyawan (id, role_id, nama, email, password) VALUES 
(101, 1, 'Ahmad Fauzi', 'ahmad.manager@perusahaan.com', 'hash_password_123'),
(102, 2, 'Budi Santoso', 'budi.dev@perusahaan.com', 'hash_password_456'),
(103, 2, 'Citra Lestari', 'citra.designer@perusahaan.com', 'hash_password_789');

INSERT INTO absensi (id, karyawan_id, tanggal, jam_masuk, jam_keluar, status) VALUES 
(201, 101, '2026-05-20', '08:00:00', '17:00:00', 'Hadir'),
(202, 102, '2026-05-20', '08:15:00', '17:05:00', 'Hadir'),
(203, 103, '2026-05-20', NULL, NULL, 'Izin');

INSERT INTO projects (id, manager_id, nama_project, budget, tanggal_mulai, tanggal_selesai, status) VALUES 
(301, 101, 'Sistem Informasi Akademik', 50000000.00, '2026-06-01', '2026-08-31', 'Perencanaan');

INSERT INTO anggota_project (id, project_id, karyawan_id, peran_project, alokasi_gaji) VALUES 
(401, 301, 102, 'Backend Developer', 15000000.00),
(402, 301, 103, 'UI/UX Designer', 10000000.00);

INSERT INTO tugas (id, project_id, karyawan_id, judul_tugas, deskripsi, status, deadline) VALUES 
(501, 301, 102, 'Perancangan Database', 'Buat skema database lengkap beserta dummy datanya.', 'On Progress', '2026-06-05 23:59:59'),
(502, 301, 103, 'Slicing UI ke Figma', 'Buat wireframe dan mockup high-fidelity untuk core fitur.', 'Pending', '2026-06-10 23:59:59');

-- absensi karyawan
SELECT tanggal, jam_masuk, jam_keluar, status 
FROM absensi;

-- list tugas setiap karyawan
SELECT t.judul_tugas, t.status, t.deadline, p.nama_project 
FROM tugas t
JOIN projects p ON t.project_id = p.id;

-- melihat status project (manager)
SELECT id, nama_project, budget, status, tanggal_selesai 
FROM projects 
WHERE manager_id = 101;

-- melihar rekap progress tugas tim
SELECT status, COUNT(*) AS jumlah_tugas
FROM tugas
WHERE project_id = 301
GROUP BY status;

-- melihat rekan kerja dalam satu project
SELECT k.nama, ap.peran_project 
FROM anggota_project ap
JOIN karyawan k ON ap.karyawan_id = k.id
WHERE ap.project_id = (
    SELECT project_id FROM anggota_project WHERE karyawan_id = 102 LIMIT 1
);

-- menghitung total gaji karyawan untuk satu project
SELECT SUM(alokasi_gaji) AS total_pengeluaran 
FROM anggota_project 
WHERE project_id = 301;

-- menghitung keuntungan dari satu project
SELECT 
        p.nama_project,
        p.budget AS pendapatan_klien,
        SUM(ap.alokasi_gaji) AS total_biaya_karyawan,
        (p.budget - SUM(ap.alokasi_gaji)) AS keuntungan_bersih
    FROM projects p
    JOIN anggota_project ap ON p.id = ap.project_id
    WHERE p.id = 301
    GROUP BY p.id;
