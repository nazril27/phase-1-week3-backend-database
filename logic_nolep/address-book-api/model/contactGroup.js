const db = require('../connection/connection');

class ContactGroup {
    static create(data) {
        const { ContactId, GroupId } = data;
        const query = `INSERT INTO GroupContact (ContactId, GroupId) VALUES (?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(query, [ContactId, GroupId], function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ContactId, GroupId });
            });
        });
    }

    static update(id, data) {
        const { ContactId, GroupId } = data;
        const query = `UPDATE GroupContact SET ContactId = ?, GroupId = ? WHERE ID = ?`;

        return new Promise((resolve, reject) => {
            db.run(query, [ContactId, GroupId, id], function (err) {
                if (err) reject(err);
                else resolve({ id, ContactId, GroupId });
            });
        });
    }

    static delete(id) {
        const query = `DELETE FROM GroupContact WHERE ID = ?`;

        return new Promise((resolve, reject) => {
            db.run(query, [id], function(err) {
                if (err) reject(err);
                resolve({ deletedRows: this.changes });
            });
        });
    }
}

module.exports = ContactGroup;