const command = process.argv[2];
const argument = process.argv.slice(4);
const destination = process.argv[3];

const ContactController = require("./Controller/ContactController");
const GroupsController = require('./Controller/GroupsController');
const ContactGroupsController = require('./Controller/ContactGroupsController');
const View = require('./View/view');

/*
====================
ADDRESS BOOK COMMAND
====================

> node main.js create Contact <name> <phoneNumber> <company> <email>
> node main.js update Contact <id> <name> <phoneNumber> <company> <email>
> node main.js delete Contact <id>
> node main.js showContact
> node main.js create Groups <groupName>
> node main.js update Groups <id> <groupName>
> node main.js delete Groups <id>
> node main.js showGroups
> node main.js create ContactGroups <contactId> <groupId>
> node main.js update ContactGroups <id> <contactId> <groupId>
> node main.js delete ContactGroups <id> 
> node main.js help

*/

if (destination === 'Contact' || command === 'showContact') {

    switch (command) {
        case "create":
                ContactController.create(argument[0], argument[1], argument[2], argument[3]);
            break;
        case "update":
                ContactController.update(argument[0], argument[1], argument[2], argument[3], argument[4]);
            break;
        case "delete":
                ContactController.delete(argument[0]);
            break;
        case "showContact":
                ContactController.show();
            break;
        default:
                View.helpView();
            break;
    }

} else if (destination === 'Groups' || command === 'showGroups') {

    switch (command) {
        case "create":
                GroupsController.create(argument[0]);
            break;
        case "update":
                GroupsController.update(argument[0], argument[1]);
            break;
        case "delete":
                GroupsController.delete(argument[0]);
            break;
        case "showGroups":
                GroupsController.show();
            break;
        default:
                View.helpView();
            break;
    }

} else if (destination === 'ContactGroups') {

    switch (command) {
        case "create":
                ContactGroupsController.create(argument[0], argument[1]);
            break;
        case "update":
                ContactGroupsController.update(argument[0], argument[1], argument[2]);
            break;
        case "delete":
                ContactGroupsController.delete(argument[0]);
            break;
        default:
                View.helpView();
            break;
    }

} else {
    View.helpView();
}

