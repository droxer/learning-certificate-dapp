// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LearningCertificate is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct Certificate {
        string courseName;
        string studentName;
        uint256 completionDate;
        string grade;
        string ipfsHash;
    }

    mapping(uint256 => Certificate) public certificates;

    constructor() ERC721("LearningCertificate", "LCERT") {}

    function mintCertificate(
        address recipient,
        string memory courseName,
        string memory studentName,
        uint256 completionDate,
        string memory grade,
        string memory ipfsHash
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);

        certificates[newItemId] = Certificate({
            courseName: courseName,
            studentName: studentName,
            completionDate: completionDate,
            grade: grade,
            ipfsHash: ipfsHash
        });

        return newItemId;
    }

    function getCertificate(uint256 tokenId) public view returns (Certificate memory) {
        return certificates[tokenId];
    }
}