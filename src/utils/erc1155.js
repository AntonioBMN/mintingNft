import { pinFileToIPFS, pinJSONToIPFS } from './pinata.js'
require('dotenv').config()
const Web3 = require('web3');
const endpoint = process.env.REACT_APP_ENDPOINT
const web3 = new Web3(endpoint);
const { fetchNfts, fetchNftEvents } = require('./openSea')

const abi = require('../abi/erc11555-abi.json')
const contractAddress = '0xd1504999dB5F02B88D5913c36066a08ede159A4c';

export const mintERC1155 = async (metadata, amount ) => {  
  let pinataResponse = await pinJSONToIPFS(metadata);
  let tokenURI = pinataResponse.pinataUrl;

  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }

  window.contract = await new web3.eth.Contract(abi, contractAddress);
  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.mint(tokenURI, amount).encodeABI()//make call to NFT smart contract 
  };

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
}

export const transferERC1155 = async (to, tokenId, amount) => {
  window.contract = await new web3.eth.Contract(abi, contractAddress);
  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.safeTransferFrom(window.ethereum.selectedAddress, to, tokenId, amount, "0x00").encodeABI()//make call to NFT smart contract 
  };
  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
}

export const fetchMyItems = async () => {
  const date = await fetchNfts(contractAddress)
  return date
}

export const fetchMyEvents = async (id) => {
  const events = await fetchNftEvents(contractAddress, id)
  return events
}

export const getTokenAmount = async (address, id) => {
  window.contract = await new web3.eth.Contract(abi, contractAddress);
  const amount = await window.contract.methods.balanceOf(address, id).call()
  return amount
}

export const getInstance = async () => {
  return window.contract = await new web3.eth.Contract(abi, contractAddress);
}