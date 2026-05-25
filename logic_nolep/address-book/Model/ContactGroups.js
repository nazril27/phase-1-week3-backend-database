const db = require('./../connection');

class ContactGroups {
    static create(contactId, groupId) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO GroupContact VALUES (null, ?, ?)`,
                [contactId, groupId], (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Grup Kontak berhasil dibuat.`);
                    }
                }
            );
        });
    }

    static update(id, contactId, groupId) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE GroupContact SET contactId = ?, groupId = ? WHERE ID = ?`,
                [contactId, groupId, id], (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Grup kontak id: ${id} berhasil diperbarui.`);
                    }
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM GroupContact WHERE id = ?`,
                id, (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Grup kontak id: ${id} berhasil dihapus.`);
                    }
                }
            )
        });
    }
}

module.exports = ContactGroups;