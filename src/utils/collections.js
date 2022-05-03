require('dotenv').config();
const axios = require('axios');

export const fetchCollections = async (address) => {
    var data = JSON.stringify({
        "signerAddress": address
    });

    var config = {
        method: 'post',
        url: 'http://localhost:3001/app/getCollection',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        });


};

export const newCollection = async () => {
    const url = `http://localhost:8080/app/collection`
    return axios
        .post(url, {
        })
        .then(function (response) {
            return {
                success: true,
                collections: response
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

        });
};


