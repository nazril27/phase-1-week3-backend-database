const db = require('./../connection');

class Contact {
    static create(name, phoneNumber, company, email) {
        const arr = [name, phoneNumber, company, email];
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO Contact VALUES (null, ?, ?, ?, ?)`, 
                arr, (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Kontak baru ${name} berhasil ditambahkan.`);
                    }
                });
            }
        );
    }

    static update(id, name, phoneNumber, company, email) {
        const arr = [name, phoneNumber, company, email, id];
        return new Promise((resolve, reject) => {
            db.run(`UPDATE Contact SET name = ?, phoneNumber = ?, company = ?, email = ? WHERE id = ?`, 
                arr, (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Kontak id: ${id} berhasil diperbarui.`);
                    }
                });
            }
        );
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Contact WHERE id = ?`, id, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(`Kontak id: ${id} berhasil dihapus.`);
                }
            });
        });
    }

    static show() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT c.id ID, c.name Name, c.company Company, 
                g.groupName "In Groups", c.email Email, c.phoneNumber "Phone Number"
                FROM Contact c
                LEFT JOIN GroupContact gc ON c.id = gc.ContactId
                LEFT JOIN Groups g ON gc.GroupId = g.id ORDER BY Name
                `, (err, rows) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    } 
}

module.exports = Contact;