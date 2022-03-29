// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nft is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter _tokenIds;

    constructor() ERC721("NFT Minter", "NFT") {}

    function mint (string memory tokenURI) public onlyOwner {
        _tokenIds.increment();
        uint newId = _tokenIds.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, tokenURI);
    }
}