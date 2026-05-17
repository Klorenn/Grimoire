// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title GrimoireRegistry
 * @notice Onchain registry for Grimoire inscriptions.
 *
 * Stores the CID (IPFS content identifier) and minimal metadata for each
 * user inscription. NO secrets, plaintext, passphrases, or encrypted content
 * are ever stored onchain. Only the CID, kind, and titleHash are recorded.
 *
 * This gives users verifiable proof that their inscription exists on Filecoin
 * without exposing any private data.
 */
contract GrimoireRegistry {
    struct Inscription {
        address owner;
        string cid;
        string kind;
        string titleHash;
        uint256 createdAt;
    }

    /// @dev owner => list of inscriptions
    mapping(address => Inscription[]) private inscriptions;

    /// @dev Total inscriptions across all users
    uint256 public totalInscriptions;

    /// @notice Emitted when a new inscription is created
    event InscriptionCreated(
        address indexed owner,
        string cid,
        string kind,
        string titleHash,
        uint256 createdAt
    );

    /**
     * @notice Create a new inscription.
     * @param cid The IPFS CID of the encrypted payload
     * @param kind The type of inscription (e.g. "seed-phrase", "private-key")
     * @param titleHash SHA-256 hash of the title (title is never stored in plaintext)
     */
    function createInscription(
        string calldata cid,
        string calldata kind,
        string calldata titleHash
    ) external {
        require(bytes(cid).length > 0, "CID cannot be empty");
        require(bytes(kind).length > 0, "Kind cannot be empty");

        Inscription memory inscription = Inscription({
            owner: msg.sender,
            cid: cid,
            kind: kind,
            titleHash: titleHash,
            createdAt: block.timestamp
        });

        inscriptions[msg.sender].push(inscription);
        totalInscriptions++;

        emit InscriptionCreated(msg.sender, cid, kind, titleHash, block.timestamp);
    }

    /**
     * @notice Get all inscriptions for the caller.
     * @return Inscription[] memory
     */
    function getMyInscriptions() external view returns (Inscription[] memory) {
        return inscriptions[msg.sender];
    }

    /**
     * @notice Get all inscriptions for a specific owner.
     * @param owner The address to query
     * @return Inscription[] memory
     */
    function getInscriptions(address owner) external view returns (Inscription[] memory) {
        return inscriptions[owner];
    }

    /**
     * @notice Get the number of inscriptions for the caller.
     * @return uint256
     */
    function getMyInscriptionCount() external view returns (uint256) {
        return inscriptions[msg.sender].length;
    }
}
