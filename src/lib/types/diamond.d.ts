import type { Contract } from "./contract";

export type Diamond = Contract & {
    facets: Contract[]
}

export type DiamondInfo = {
    chainId: number,
    address: Address,
    diamond: Diamond,
    diamondAbi: Abi,
}

export type DiamondData = {
    stakedNfts: bigint,
    pendingRewards: bigint,
    rewardsPerSecond: bigint,
}