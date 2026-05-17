/**
 * Grimoire Contract — Onchain integration via viem.
 *
 * Interacts with the GrimoireRegistry smart contract deployed on Filecoin Calibration.
 * Stores only CID + kind + titleHash onchain. NO secrets, plaintext, or passphrases.
 */

import { readContract } from '@wagmi/core';
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
