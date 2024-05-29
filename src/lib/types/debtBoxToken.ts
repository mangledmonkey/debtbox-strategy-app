import type { Address } from 'viem';

export type DebtBoxToken = {
    type: string,
    id: string,
    attributes: {
        name: string,
        symbol: string,
        address: Address|string,
        decimals: number,
        chainId: number,
        tax: number,
        uiConfig: {
            logoUri: string,
            primaryColor: string,
        },
        type: string,
        routeToDebt: [],
        priceUsd: number,
        h24Change: number,
        createdAt: string,
        updatedAt: string,
    }
};