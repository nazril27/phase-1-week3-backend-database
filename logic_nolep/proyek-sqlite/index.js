import sqlite3 from 'sqlite3';
import util from 'util';

const db = new sqlite3.Database('database_karyawan.db');

const dbRun = util.promisify(db.run).bind(db);
const dbAll = util.promisify(db.all).bind(db);
const dbExec = util.promisify(db.exec).bind(db);

async function main() {
    try {
        await dbExec(`
            CREATE TABLE IF NOT EXISTS Karyawan (
                IDKaryawan INTEGER PRIMARY KEY AUTOINCREMENT,
                Nama TEXT NOT NULL,
                Usia INTEGER,
                Jabatan TEXT
            );
            CREATE TABLE IF NOT EXISTS Proyek (
                IDProyek INTEGER PRIMARY KEY AUTOINCREMENT,
                NamaProyek TEXT NOT NULL,
                IDKaryawanPenanggung INTEGER,
                FOREIGN KEY (IDKaryawanPenanggung) REFERENCES Karyawan (IDKaryawan)
            );    
            CREATE TABLE IF NOT EXISTS Pekerjaan (
                IDPekerjaan INTEGER PRIMARY KEY AUTOINCREMENT,
                NamaPekerjaan TEXT NOT NULL,
                IDProyek INTEGER,
                IDKaryawan INTEGER,
                FOREIGN KEY (IDProyek) REFERENCES Proyek (IDProyek),
                FOREIGN KEY (IDKaryawan) REFERENCES Karyawan (IDKaryawan)
            );
        `);
        console.log('✅ Tabel berhasil dibuat.');

        await dbExec('BEGIN');
        
        await dbRun('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['John Doe', 30, 'Manager']);
        await dbRun('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Jane Smith', 25, 'Programmer']);
        await dbRun('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Bob Johnson', 35, 'Sales']);
        await dbRun('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Alice Brown', 28, 'Designer']);

        await dbRun('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek A', 2]);
        await dbRun('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek B', 4]);
        await dbRun('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek C', 1]);

        await dbRun('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 1', 101, 2]);
        await dbRun('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 2', 101, 2]);
        await dbRun('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 3', 101, 4]);
        await dbRun('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 4', 102, 4]);
        await dbRun('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 5', 103, 1]);

        await dbExec('COMMIT');
        console.log('✅ Data berhasil dimasukan.');

        const karyawan = await dbAll('SELECT * FROM Karyawan');
        console.log('--- Data Karyawan ---');
        console.table(karyawan);

        const proyek = await dbAll('SELECT * FROM Proyek');
        console.log('--- Data Proyek ---');
        console.table(proyek);

        const pekerjaan = await dbAll('SELECT * FROM Pekerjaan');
        console.log('--- Data Pekerjaan ---');
        console.table(pekerjaan);

    } catch (error) {
        if (error.message.includes('transaction')) await dbExec('ROLLBACK');
        console.error('❌ Terjadi kesalahan:', error.message);
    } finally {
        db.close((err) => {
            if (err) console.error(err.message);
            else console.log('🔌 Koneksi database ditutup.');
        });
    }
}

main();