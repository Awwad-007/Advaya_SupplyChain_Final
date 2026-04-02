// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Advaya_SupplyChain_Enterprise_v3.2
 * @dev High-integrity State-Machine for Agricultural Traceability
 */
contract Advaya {
    enum Stage { Farmer, Inspector, Distributor, Consumer }

    struct Batch {
        uint256 id;
        string crop;
        uint256 weight;
        string date;
        string landId;
        Stage stage;
        address farmer;
        address auditor;
        bool isVerified;
        uint256 distance;
        uint256 timestamp;
    }

    mapping(uint256 => Batch) public registry;
    uint256 public totalBatches;

    event AssetMinted(uint256 indexed id, string crop, address farmer);
    event AuditCompleted(uint256 indexed id, address auditor);
    event LogisticsInitialized(uint256 indexed id, address distributor);

    modifier atStage(uint256 _id, Stage _stage) {
        require(registry[_id].stage == _stage, "Sequence Error: Unauthorized access at this stage.");
        _;
    }

    function registerHarvest(string memory _c, uint256 _w, string memory _d, string memory _l) public returns (uint256) {
        totalBatches++;
        registry[totalBatches] = Batch({
            id: totalBatches,
            crop: _c,
            weight: _w,
            date: _d,
            landId: _l,
            stage: Stage.Farmer,
            farmer: msg.sender,
            auditor: address(0),
            isVerified: false,
            distance: 0,
            timestamp: block.timestamp
        });
        emit AssetMinted(totalBatches, _c, msg.sender);
        return totalBatches;
    }

    function verifyQuality(uint256 _id) public atStage(_id, Stage.Farmer) {
        registry[_id].isVerified = true;
        registry[_id].auditor = msg.sender;
        registry[_id].stage = Stage.Inspector;
        emit AuditCompleted(_id, msg.sender);
    }

    function updateLogistics(uint256 _id, uint256 _dist) public atStage(_id, Stage.Inspector) {
        registry[_id].distance = _dist;
        registry[_id].stage = Stage.Distributor;
        emit LogisticsInitialized(_id, msg.sender);
    }

    function finalizeDelivery(uint256 _id) public atStage(_id, Stage.Distributor) {
        registry[_id].stage = Stage.Consumer;
    }

    function getBatchData(uint256 _id) public view returns (Batch memory) {
        require(_id <= totalBatches && _id > 0, "Query Error: Invalid Batch ID");
        return registry[_id];
    }
}