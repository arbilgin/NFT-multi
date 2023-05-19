// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MNTL is ERC1155, Ownable {

    constructor(string memory _uri) ERC1155(_uri) {
        
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount) public payable onlyOwner {
        _mint(to, id, amount, '');
    }

  
}
