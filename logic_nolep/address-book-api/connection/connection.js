const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../address_book.db');

const schema = [
    "PRAGMA foreign_keys = ON;",
    `CREATE TABLE IF NOT EXISTS Contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber TEXT UNIQUE NOT NULL,
        company TEXT,
        email TEXT UNIQUE
    )`,
    `CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        groupName TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS GroupContact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ContactId INTEGER,
        GroupId INTEGER,
        FOREIGN KEY (ContactId) REFERENCES Contact(id) ON DELETE CASCADE,
        FOREIGN KEY (GroupId) REFERENCES Groups(id) ON DELETE CASCADE
    )`
];

db.serialize(() => {
    schema.forEach((query) => {
        db.run(query, (err) => {
            if (err) console.error('Error saat buat tabel: ', err.message);
        });
    });
});


module.exports = db;