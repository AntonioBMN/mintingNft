require('dotenv').config();
const owner = '0xaB26D21F2ff5431D4E08BAE5B5EE78d08Df375ab'
const axios = require('axios');

export const fetchNfts = async(address) => {
    const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/K6OFtgpZ6W8SumGuRttz2MADROZhPiFd/getNFTs`
    const url = `${baseURL}?owner=${owner}&contractAddresses[]=${address}`
    return axios 
        .get(url, {
        })
        .then(function (response) {
           return {
               success: true,
               nfts: response
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

export const fetchNftData = async(address,id) => {
    const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/K6OFtgpZ6W8SumGuRttz2MADROZhPiFd/getNFTMetadata`
    const url = `${baseURL}?contractAddress=${address}&tokenId=${id}`   

    return axios 
        .get(url, {
        })
        .then(function (response) {
           return {
               success: true,
               nfts: response
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

