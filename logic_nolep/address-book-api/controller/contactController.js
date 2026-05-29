const Contact = require('../model/contact');

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.getContact();
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const createContact = async (req, res) => {
    try {
        const newContact = await Contact.createContact(req.body);
        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: newContact
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const updatedContact = await Contact.updateContact(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            data: updatedContact
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Contact.deleteContact(id);
        
        if (result.deletedRows === 0) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Contact deleted successfully" 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
};