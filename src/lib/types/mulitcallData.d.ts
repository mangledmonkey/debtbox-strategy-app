import type { Address } from 'viem';

export type MulticallData = {
    id: string,
    address: Address|string,
    token: {
        id: string,
        address: Address|string,
        balance: bigint,
        decimals: number,
        price: number,
    },
    rewards: {
        balance: bigint,
        rate: bigint,
    },
    stakedNfts: number,
    unstakedNfts: number,
}