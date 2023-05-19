// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftAirdrop is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // mapping(address => bool) private _whitelist;
    // mapping(uint256 => uint256) private _tokenMintTime;

    // uint256 public constant ONE_WEEK_IN_SECONDS = 604800; // 7 days

    constructor() ERC721("MentholNFT", "mNFT") {}

    // function addToWhitelist(address[] memory addresses) public onlyOwner {
    //     for (uint256 i = 0; i < addresses.length; i++) {
    //         _whitelist[addresses[i]] = true;
    //     }
    // }

    // function removeFromWhitelist(address[] memory addresses) public onlyOwner {
    //     for (uint256 i = 0; i < addresses.length; i++) {
    //         _whitelist[addresses[i]] = false;
    //     }
    // }

    // function isWhitelisted(address addr) public view returns (bool) {
    //     return _whitelist[addr];
    // }

    function safeMint(address to, string memory uri) public onlyOwner {
        //require(_whitelist[to], "Address not whitelisted");
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        // _tokenMintTime[tokenId] = block.timestamp;

    }

     // Airdrop NFTs
    function airdropNfts(address[] calldata airdropAddresses, string memory uri) public onlyOwner {

        for (uint i = 0; i < airdropAddresses.length; i++) {
            safeMint(airdropAddresses[i], uri);
        }
    }
    
    // function _mintSingleNFT(address wAddress) private {
    //     uint newTokenID = _tokenIdCounter.current();
    //     _safeMint(wAddress, newTokenID);
    //     _tokenIdCounter.increment();
    // }

    function updateTokenURI(uint256 tokenId, string memory newURI) public onlyOwner {
        //require(_isTokenOwnerOrApproved(msg.sender, tokenId), "Not token owner or approved");
        // require(block.timestamp - _tokenMintTime[tokenId] >= ONE_WEEK_IN_SECONDS, "Can't update URI yet");
        _setTokenURI(tokenId, newURI);
    }

    function updateAllTokenURI(uint256[] calldata NftIds, string memory newURI)  public onlyOwner {
        for (uint i = 0; i < NftIds.length; i++) {
            updateTokenURI(NftIds[i], newURI);
        }
    }
        

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // function _isTokenOwnerOrApproved(address spender, uint256 tokenId) internal view returns (bool) {
    //     return _isApprovedOrOwner(spender, tokenId);
    // }
}