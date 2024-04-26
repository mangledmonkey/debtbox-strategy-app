import type { Abi } from 'viem';

export type Contract = {
    name: string,
    address: Address|string,
    abi: Abi
  }
