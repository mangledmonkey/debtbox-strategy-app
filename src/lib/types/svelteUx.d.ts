import type { TokenData, WalletTotals } from ".";

export type Option = { 
    label: string; 
    value: {
        tokens: TokenData[],
        totals: WalletTotals,
    }
}
export type Options = Option[]