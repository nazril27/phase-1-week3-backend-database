const ContactGroup = require('../model/contactGroup');

const createContactGroup = async (req, res) => {
    try {
        const newContactGroup = await ContactGroup.create(req.body);
        res.status(201).json({
            success: true,
            message: "GroupContact created successfully",
            data: newContactGroup
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });        
    }
}

const updateContactGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedGroupContact = await ContactGroup.update(id, req.body);
        res.status(200).json({
            success: true,
            message: 'GroupContact updated successfully',
            data: updatedGroupContact
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
const deleteContactGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ContactGroup.delete(id);
        
        if (result.deletedRows === 0) {
            return res.status(404).json({ success: false, message: 'ContactGroup not found' });
        }

        res.status(200).json({
            success: true,
            message: 'ContactGroup deleted successfully'
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    createContactGroup,
    updateContactGroup,
    deleteContactGroup
}