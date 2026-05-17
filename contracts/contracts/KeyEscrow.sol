// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title KeyEscrow
 * @notice Stores ECIES-encrypted AES key fragments for heirs and grantees.
 *
 * When an owner wants to share access (heir, recipient, shared), they:
 * 1. Encrypt their AES vault key with the grantee's public key (ECIES)
 * 2. Store the encrypted fragment here
 *
 * When the grantee needs access:
 * 1. Fetch their fragment
 * 2. Decrypt with their wallet's private key
 * 3. Use the recovered AES key to decrypt inscriptions
 *
 * NO plaintext keys are ever stored onchain.
 */
contract KeyEscrow {
    /// @notice grantor → grantee → encrypted AES key fragment
    mapping(address => mapping(address => bytes)) public fragments;

    /// @notice grantor → list of grantees who have fragments
    mapping(address => address[]) public grantees;

    event FragmentStored(address indexed grantor, address indexed grantee);
    event FragmentCleared(address indexed grantor, address indexed grantee);

    /**
     * @notice Store an ECIES-encrypted key fragment for a grantee.
     * @param grantee The wallet that can decrypt this fragment
     * @param encryptedKey ECIES ciphertext of the AES vault key
     */
    function storeFragment(address grantee, bytes calldata encryptedKey) external {
        require(grantee != address(0), "Invalid grantee");
        require(encryptedKey.length > 0, "Empty key");

        if (fragments[msg.sender][grantee].length == 0) {
            grantees[msg.sender].push(grantee);
        }
        fragments[msg.sender][grantee] = encryptedKey;
        emit FragmentStored(msg.sender, grantee);
    }

    /**
     * @notice Get your encrypted key fragment from a grantor.
     * @param grantor The wallet that stored a fragment for you
     * @return encryptedKey The ECIES ciphertext you can decrypt with your private key
     */
    function getFragment(address grantor) external view returns (bytes memory) {
        bytes memory frag = fragments[grantor][msg.sender];
        require(frag.length > 0, "No fragment found");
        return frag;
    }

    /**
     * @notice Remove a fragment you stored.
     */
    function clearFragment(address grantee) external {
        delete fragments[msg.sender][grantee];
        emit FragmentCleared(msg.sender, grantee);
    }

    /**
     * @notice Get all grantees for a grantor.
     */
    function getGrantees(address grantor) external view returns (address[] memory) {
        return grantees[grantor];
    }

    /**
     * @notice Check if a fragment exists.
     */
    function hasFragment(address grantor, address grantee) external view returns (bool) {
        return fragments[grantor][grantee].length > 0;
    }
}
