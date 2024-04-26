import type { Address } from "viem"

export type DebtBoxProject = {
    type: string,
    id: string,
    attributes: {
        name: string,
        rewardsDistributorAddress: Address,
        microTokenAddress: Address,
        nftAddress: Address,
        tokenId: string,
        uiConfig: {
            logoUri: string,
            bannerUri: string,
            litePaper: string,
            primaryColor: string,
        },
        createdAt: string,
        updatedAt: string,
    },
    relationships: {
        token: {
            data: {
                type: string,
                id: string,
            }
        }
    }
}