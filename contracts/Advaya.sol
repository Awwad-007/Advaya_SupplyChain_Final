// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Advaya {
    struct Batch {
        string crop;
        string farmer;
        bool isVerified;
        bool hasAlert; 
        string qualityGrade;
    }

    mapping(uint256 => Batch) public batches;
    uint256 public batchCount;

    // 1. Farmer Registers
    function registerHarvest(string memory _c, string memory _f) public {
        batchCount++;
        batches[batchCount] = Batch(_c, _f, false, false, "Pending");
    }

    // 2. Inspector Verifies
    function verifyBatch(uint256 _id, string memory _grade) public {
        batches[_id].isVerified = true;
        batches[_id].qualityGrade = _grade;
    }

    // 3. Distributor Triggers SOS
    function triggerAlert(uint256 _id) public {
        batches[_id].hasAlert = true;
    }

    // 4. Consumer Fetches Data
    function getBatch(uint256 _id) public view returns (string memory, string memory, bool, bool, string memory) {
        Batch memory b = batches[_id];
        return (b.crop, b.farmer, b.isVerified, b.hasAlert, b.qualityGrade);
    }
}