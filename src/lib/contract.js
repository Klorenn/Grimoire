/**
 * Grimoire Contract — Onchain integration via viem.
 *
 * Interacts with the GrimoireRegistry smart contract deployed on Filecoin Calibration.
 * Stores only CID + kind + titleHash onchain. NO secrets, plaintext, or passphrases.
 */

import { writeContract, readContract } from '@wagmi/core';
import { config, CONTRACT_ADDRESS } from '../config.js';

const ABI = [
  {
    inputs: [
      { name: 'cid', type: 'string' },
      { name: 'kind', type: 'string' },
      { name: 'titleHash', type: 'string' },
    ],
    name: 'createInscription',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMyInscriptions',
    outputs: [
      {
        components: [
          { name: 'owner', type: 'address' },
          { name: 'cid', type: 'string' },
          { name: 'kind', type: 'string' },
          { name: 'titleHash', type: 'string' },
          { name: 'createdAt', type: 'uint256' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'getInscriptions',
    outputs: [
      {
        components: [
          { name: 'owner', type: 'address' },
          { name: 'cid', type: 'string' },
          { name: 'kind', type: 'string' },
          { name: 'titleHash', type: 'string' },
          { name: 'createdAt', type: 'uint256' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

/**
 * Register a CID onchain.
 * @param {string} cid - The IPFS CID
 * @param {string} kind - Inscription kind
 * @param {string} titleHash - SHA-256 hash of the title
 * @returns {Promise<string>} Transaction hash
 */
export async function registerCidOnchain(cid, kind, titleHash) {
  const hash = await writeContract(config, {
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'createInscription',
    args: [cid, kind, titleHash],
  });
  return hash;
}

/**
 * Read all inscriptions for the connected wallet.
 * @returns {Promise<Array>}
 */
export async function readMyInscriptions() {
  const result = await readContract(config, {
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getMyInscriptions',
  });
  return result;
}
