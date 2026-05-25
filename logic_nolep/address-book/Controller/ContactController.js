const Contact = require("./../Model/Contact");
const View = require("../View/view");

class ContactController {
    static async create(name, phoneNumber, company, email) {
        try {
            const query = await Contact.create(name, phoneNumber, company, email);
            View.createView(query);
        } catch (error) {
            View.errorView(error);
        }
    }

    static async update(id, name, phoneNumber, company, email) {
        try {
            const query = await Contact.update(id, name, phoneNumber, company, email);
            View.updateView(query);
        } catch (error) {
            View.errorView(error);
        }
    }

    static async delete(id) {
        try {
            const query = await Contact.delete(id);
            View.deleteView(query); 
        } catch (error) {
            View.errorView(error);
        }
    }

    static async show() {
        try {
            const query = await Contact.show();
            View.showView(query);
        } catch (error) {
            View.errorView(error);
        }
    }
}

module.exports = ContactController;