const ContactGroups = require('./../Model/ContactGroups');
const View = require('./../View/view');

class ContactGroupsController {
    static async create(contactId, groupId) {
        try {
            const query = await ContactGroups.create(contactId, groupId);
            View.createView(query);
        } catch (error) {
            View.errorView(error);
        }
    }

    static async update(id, contactId, groupId) {
        try {
            const query = await ContactGroups.update(id, contactId, groupId);
            View.updateView(query);
        } catch (error) {
            View.errorView(error);
        }
    }

    static async delete(id) {
        try {
            const query = await ContactGroups.delete(id);
            View.deleteView(query);
        } catch (error) {
            View.errorView(error);
        }
    }
}

module.exports = ContactGroupsController;