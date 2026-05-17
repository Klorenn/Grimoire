// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title GrimoireRegistry
 * @notice Onchain registry for Grimoire inscriptions with time-lock and proof-of-life.
 */
contract GrimoireRegistry {
    struct Inscription {
        address owner;
        string cid;
        string kind;
        string titleHash;
        uint256 createdAt;
        uint256 unlockAt; // 0 = no time-lock
        bool revoked;
    }

    struct HeirConfig {
        address[] heirs;
        uint8 threshold;
        uint256 dormancyPeriod;
        uint256 lastPing;
    }

    mapping(address => Inscription[]) private inscriptions;
    mapping(address => HeirConfig) public heirConfigs;
    uint256 public totalInscriptions;

    event InscriptionCreated(address indexed owner, string cid, string kind, string titleHash, uint256 createdAt, uint256 unlockAt);
    event InscriptionRevoked(uint256 indexed id);
    event Pinged(address indexed owner, uint256 timestamp);
    event HeirsConfigured(address indexed owner, uint8 threshold, uint256 dormancyPeriod);

    function createInscription(string calldata cid, string calldata kind, string calldata titleHash, uint256 unlockAt) external {
        require(bytes(cid).length > 0, "CID cannot be empty");
        require(bytes(kind).length > 0, "Kind cannot be empty");

        Inscription memory inscription = Inscription({
            owner: msg.sender,
            cid: cid,
            kind: kind,
            titleHash: titleHash,
            createdAt: block.timestamp,
            unlockAt: unlockAt,
            revoked: false
        });

        inscriptions[msg.sender].push(inscription);
        totalInscriptions++;
        emit InscriptionCreated(msg.sender, cid, kind, titleHash, block.timestamp, unlockAt);
    }

    function revokeInscription(uint256 index) external {
        require(index < inscriptions[msg.sender].length, "Invalid index");
        inscriptions[msg.sender][index].revoked = true;
        emit InscriptionRevoked(index);
    }

    function getMyInscriptions() external view returns (Inscription[] memory) {
        return inscriptions[msg.sender];
    }

    function getInscriptions(address owner) external view returns (Inscription[] memory) {
        return inscriptions[owner];
    }

    function getMyInscriptionCount() external view returns (uint256) {
        return inscriptions[msg.sender].length;
    }

    /** @notice Proof of life — resets dormancy timer for heirs */
    function ping() external {
        if (heirConfigs[msg.sender].dormancyPeriod > 0) {
            heirConfigs[msg.sender].lastPing = block.timestamp;
        }
        emit Pinged(msg.sender, block.timestamp);
    }

    /** @notice Check if owner is dormant (past dormancy period since last ping) */
    function isDormant(address owner) external view returns (bool) {
        HeirConfig storage cfg = heirConfigs[owner];
        if (cfg.dormancyPeriod == 0) return false;
        return block.timestamp > cfg.lastPing + cfg.dormancyPeriod;
    }

    function configureHeirs(address[] calldata heirs, uint8 threshold, uint256 dormancyPeriod) external {
        require(heirs.length > 0, "Need at least 1 heir");
        require(threshold > 0 && threshold <= heirs.length, "Invalid threshold");
        heirConfigs[msg.sender] = HeirConfig(heirs, threshold, dormancyPeriod, block.timestamp);
        emit HeirsConfigured(msg.sender, threshold, dormancyPeriod);
    }
}
