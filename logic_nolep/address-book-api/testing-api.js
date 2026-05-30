const axios = require('axios');
const { response } = require('express');

const addressBookApi = 'http:localhost:3000/contact';

// axios.get(addressBookApi)
// .then((response) => {
//     console.log(response.data);
// })
// .catch((error) => {
//     console.error('kesalahan:', error);
// });

axios.post(addressBookApi, {
    name: "John",
    phoneNumber: "99000099",
    company: "fury idn",
    email: "john@gmail"
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error);
})