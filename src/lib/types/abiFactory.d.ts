import type { Abi } from 'viem';

export type AbiFactory = {
    name: string,
    id: string,
    abi: Abi | null,
    type: string,
}