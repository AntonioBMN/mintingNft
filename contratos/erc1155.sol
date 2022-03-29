// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nft is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter _tokenIds;
    string public name = "ERC1155 Minter";
    string public symbol = "Mntr";

    mapping (uint => string) private _uris;
    
    constructor() ERC1155("") {}

    function uri (uint tokenId) override public view returns (string memory) {
        return(_uris[tokenId]);
    }

    function _setTokenURI (uint tokenId, string memory tokenURI) private onlyOwner {
        _uris[tokenId] = tokenURI;
    }

    function mint (string memory tokenURI, uint amount) public onlyOwner {
        _tokenIds.increment();
        uint newId = _tokenIds.current();
        _mint(msg.sender, newId, amount, "");
        _setTokenURI(newId, tokenURI);
    }
}