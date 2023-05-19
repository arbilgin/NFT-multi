// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MentholNFT is ERC721A, Ownable {
    string uri;

    constructor(string memory _uri) ERC721A("MentholProtocol", "COOL") {
        uri = _uri;
    }

    function airdrop(address[] memory to, uint256 quantity) public onlyOwner {

        for (uint256 i = 0; i < to.length; i++) {
            _mint(to[i], quantity);
        }
    }

    function mint(address to, uint256 quantity) external payable {
        _mint(to, quantity);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return uri;
    }

    function setURI(string memory newURI) public onlyOwner {
        uri = newURI;
    }
}
