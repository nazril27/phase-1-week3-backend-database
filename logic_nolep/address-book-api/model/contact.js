const db = require('../connection/connection');

class Contact {
    static getContact() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Contact';
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static createContact(data) {
        return new Promise((resolve, reject) => {
            const { name, phoneNumber, company, email } = data;
            const query = `INSERT INTO Contact (name, phoneNumber, company, email) VALUES (?, ?, ?, ?)`;

            db.run(query, [name, phoneNumber, company, email], function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, name, phoneNumber, company, email });
            });
        });
    }

    static updateContact(id, data) {
        return new Promise((resolve, reject) => {
            const { name, phoneNumber, company, email } = data;
            const query = `UPDATE Contact SET name = ?, phoneNumber = ?, company = ?, email = ? WHERE ID = ?`;

            db.run(query, [name, phoneNumber, company, email, id], (err) => {
                if (err) reject(err);
                else resolve({ id, name, phoneNumber, company, email });
            });
        });
    }

    static deleteContact(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM Contact WHERE id = ?`;
            
            db.run(query, [id], function(err) {
                if (err) reject(err);
                else resolve({ deletedRows: this.changes });
            });
        });
    }
}

module.exports = Contact;