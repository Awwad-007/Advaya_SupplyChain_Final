// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Advaya {
    struct Batch {
        string crop;
        string farmer;
        bool isVerified;
        bool hasAlert; 
    }

    mapping(uint256 => Batch) public batches;
    uint256 public batchCount;

    function registerHarvest(string memory _c, string memory _f) public {
        batchCount++;
        batches[batchCount] = Batch(_c, _f, false, false);
    }

    function triggerAlert(uint256 _id) public {
        batches[_id].hasAlert = true;
    }

    function getBatch(uint256 _id) public view returns (string memory, string memory, bool, bool) {
        Batch memory b = batches[_id];
        return (b.crop, b.farmer, b.isVerified, b.hasAlert);
    }
}