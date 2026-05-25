const db = require('./../connection');

class Groups {
    static create(groupName) {
        const newGroups = new Groups(groupName);
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO Groups VALUES (null, ?)`, 
                groupName, (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Grup ${groupName} berhasil dibuat.`);
                    }
                });
            }
        );
    }

    static update(id, groupName) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE Groups SET groupName = ? WHERE id = ?`,
                [groupName, id], (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Grup id: ${id} berhasil diperbarui.`);
                    }
                }
            )
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Groups WHERE id = ?`,
                id, (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(`Grup id: ${id} berhasil dihapus.`);
                    }
                }
            );
        });
    }

    static show() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT g.id AS ID, g.groupName AS "Group", c.name AS Member, c.company AS Company 
                FROM Groups g
                LEFT JOIN GroupContact gc ON g.id = gc.GroupId
                LEFT JOIN Contact c ON gc.ContactId = c.id `,
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = Groups;