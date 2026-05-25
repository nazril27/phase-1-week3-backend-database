class View {
    static createView(data) {
        console.log(data);
    }

    static updateView(data) {
        console.log(data);
    }

    static deleteView(data) {
        console.log(data);
    }

    static showView(data) {
        console.table(data);
    }

    static errorView(error) {
        console.error('Terjadi kesalahan ->', error);
    }

    static helpView() {
        console.log('====================');
        console.log('ADDRESS BOOK COMMAND');
        console.log('====================');
        console.log('> node main.js create Contact <name> <phoneNumber> <company> <email>');
        console.log('> node main.js update Contact <id> <name> <phoneNumber> <company> <email>');
        console.log('> node main.js delete Contact <id>');
        console.log('> node main.js showContact');
        console.log('> node main.js create Groups <groupName>');
        console.log('> node main.js update Groups <id> <groupName>');
        console.log('> node main.js delete Groups <id>');
        console.log('> node main.js showGroups');
        console.log('> node main.js create ContactGroups <contactId> <groupId>');
        console.log('> node main.js update ContactGroups <id> <contactId> <groupId>');
        console.log('> node main.js delete ContactGroups <id> ');
        console.log('> node main.js help');
    }
}

module.exports = View;