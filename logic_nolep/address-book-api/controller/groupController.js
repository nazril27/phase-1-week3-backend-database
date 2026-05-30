const Group = require('../model/group');

const getGroups = async (req, res) => {
    try {
        const groups = await Group.get();
        res.status(200).json({
            success: true,
            data: groups
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const createGroups = async (req, res) => {
    try {
        const { groupName } = req.body;
        const newGroup = await Group.create(groupName);
        res.status(201).json({
            success: true,
            message: 'Group created successfully',
            data: newGroup
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateGroups = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedGroup = await Group.update(id, req.body);
        res.status(200).json({ 
            success: true,
            message: 'Group updated successfully',
            data: updateGroups
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteGroups = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Group.delete(id);

        if (result.deletedRows === 0) {
            return res.status(404).json({ success: false, message: 'Group not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Group deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}

module.exports = {
    getGroups,
    createGroups,
    updateGroups,
    deleteGroups
}