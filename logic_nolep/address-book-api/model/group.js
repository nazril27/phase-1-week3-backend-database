const db = require('../connection/connection');

class Group {
    static get() {
        const query = `SELECT g.id AS ID, g.groupName AS "Group", c.name AS Member, c.company AS "Member Company" 
                FROM Groups g
                LEFT JOIN GroupContact gc ON g.id = gc.GroupId
                LEFT JOIN Contact c ON gc.ContactId = c.id`;
        return new Promise((resolve, reject) => {
            db.all(query, [], function(err, rows) {
                if (err) reject(err);
                else resolve(rows);
            })
        });
    }

    static create(groupName) {
        const query = `INSERT INTO Groups (groupName) VALUES (?)`;
        return new Promise((resolve, reject) => {
            db.run(query, [groupName], function(err) {
                if (err) reject(err);
                resolve({ id: this.lastID, groupName });
            });
        });
    }

    static update(id, data) {
        const { groupName } = data;
        const query = `UPDATE Groups SET groupName = ? WHERE ID = ?`;

        return new Promise((resolve, reject) => {
            db.run(query, [groupName, id], function(err) {
                if (err) reject(err);
                resolve({ id, groupName });
            });
        });
    }

    static delete(id) {
        const query = `DELETE FROM Groups WHERE ID = ?`;

        return new Promise((resolve, reject) => {
            db.run(query, [id], function(err) {
                if (err) reject(err);
                resolve({ deletedRows: this.changes });
            });
        });
    }
}

module.exports = Group;