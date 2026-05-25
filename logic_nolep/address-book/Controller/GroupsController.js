const Groups = require('./../Model/Groups');
const View = require('./../View/view');

class GroupsController {
    static async create(groupName) {
        try {
            const query = await Groups.create(groupName);
            View.createView(query);
        } catch (error) {
            View.errorView(error);
        }
    } 

    static async update(id, groupName) {
        try {
            const query = await Groups.update(id, groupName);
            View.updateView(query);
        } catch (error) {
            View.errorView(error);
        }
    }

    static async delete(id) {
        try {
            const query = await Groups.delete(id);
            View.deleteView(query);
        } catch (error) {
            View.errorView(error);
        }
    }

    static async show() {
        try {
            const query = await Groups.show();
            View.showView(query);
        } catch (error) {
            View.errorView(error);
        }
    }
}

module.exports = GroupsController;