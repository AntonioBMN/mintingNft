import { pinFileToIPFS, pinJSONToIPFS } from './pinata.js'
require('dotenv').config()
const Web3 = require('web3');
const endpoint = process.env.REACT_APP_ENDPOINT
const web3 = new Web3(endpoint);
const { fetchNfts } = require('./openSea')

const abi = require('../abi/contract-abi.json')
const contractAddress = "0xF50d4c106494f855c6A28657433252F138b2f748";

export const mintNFT = async (file, name, description) => {
  //make pinata call
  let pinataResponse = await pinFileToIPFS(file);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  let tokenURI = pinataResponse.pinataUrl;
  const metadata = {};
  metadata.name = name;
  metadata.image = tokenURI;
  metadata.description = description;
  pinataResponse = await pinJSONToIPFS(metadata);
  tokenURI = pinataResponse.pinataUrl;

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
    'data': window.contract.methods.mint(tokenURI).encodeABI()//make call to NFT smart contract 
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

export const transferNft = async (to, tokenId) => {
  window.contract = await new web3.eth.Contract(abi, contractAddress);
  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.safeTransferFrom(window.ethereum.selectedAddress, to, tokenId).encodeABI()//make call to NFT smart contract 
  };
  console.log('teste')

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

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using this button.👆🏽 🦊",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const changeNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x13881' }], // Hexadecimal version of 80001, prefixed with 0x
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x13881', // Hexadecimal version of 80001, prefixed with 0x
            chainName: "POLYGON Mumbai",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            iconUrls: [""],
          }],
        });
      } catch (addError) {
        console.log('Did not add network');
      }
    }
  } 
};

export const fetchMyItems = async () => {
  console.log(await web3.eth.getBlockNumber())

  return await fetchNfts(contractAddress)
}

/* export const fetchMyEvents = async (id) => {
  const events = await fetchNftEvents(contractAddress, id)
  return events
} */

export const getInstance = async () => {
  return window.contract = await new web3.eth.Contract(abi, contractAddress);
}