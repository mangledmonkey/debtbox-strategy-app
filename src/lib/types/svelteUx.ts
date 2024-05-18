import type { TokenData, WalletTotals } from ".";

export type Option = { 
    label: string; 
    value: {
        tokens: (void|TokenData)[],
        totals: WalletTotals,
    }
};
export type Options = Option[];