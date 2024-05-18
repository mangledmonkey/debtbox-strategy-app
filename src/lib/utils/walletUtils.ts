import type { Address } from "viem";
import type { DebtStakingData, Options, TokenData, WalletTotals } from "$lib/types";

export async function getUserWallets(signerAddress: Address|string|null): Promise<Address[]> {
    console.log("🚀 ~ getUserWallets ~ starting request...")
    let wallets: Address[] = []

    if (signerAddress) {
        try {
            console.log('Requesting wallets for ', signerAddress)
            const response = await fetch(`/api/v1/user/wallets`, {
                method: 'POST',
                body: JSON.stringify({
                    userAddress: signerAddress,
                    includeUser: 'true',
                }),
                headers: {
                    'content-type': 'application/json',
                },
            });
            
            wallets = await response.json();
            console.log("🚀 ~ getUserWallets ~ wallets:", wallets)
        } catch (error) {
            console.log("🚀 ~ getUserWallets ~ error:", error)
        }
    }

    return wallets;
}

export async function getWalletData(wallets: Address[]|string|null, chainId: number|null|undefined): Promise<Options> {
    console.log("🚀 ~ getUserWallets ~ starting request...")
    let walletData: Options = []

    if (wallets && chainId) {
        try {
            console.log('Requesting token data for ', wallets)
            const response = await fetch(`/api/v1/user/tokens`, {
                method: 'POST',
                body: JSON.stringify({
                    wallets,
                    chainId,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            });
            
            walletData = await response.json();
            console.log("🚀 ~ getWalletData ~ wallets:", wallets)
        } catch (error) {
            console.log("🚀 ~ getWalletData ~ error:", error)
        }
    }

    return walletData;
}

export function getWalletTotals(tokens: (void|TokenData)[], debtStakingData: DebtStakingData): WalletTotals  {
    // console.log('🚀 ~ getWalletTotals ~ tableData:', tokens)
    const walletTotals: WalletTotals = {
        ...debtStakingData,
        debtPrice: 0,
        totalNfts: 0,
        stakedNfts: 0,
        unstakedNfts: 0,
        dailyReturns: 0,
        walletBalance: 0,
        rewardsBalance: 0,
        avgDailyNftReturn: 0,
    }
  
    if (tokens) {
        // Sum values for all tokens
        for (let i = 0; i < tokens.length; i += 1) {
            const token = tokens[i]
            
            if (token) {
                if (token.name === "DEBT") walletTotals.debtPrice = token.price;
                walletTotals.totalNfts += token.totalNfts;
                walletTotals.stakedNfts += token.stakedNfts;
                walletTotals.unstakedNfts += token.unstakedNfts;
                walletTotals.dailyReturns += token.dailyWalletRewardsValue;
                walletTotals.walletBalance += token.walletValue;
                walletTotals.rewardsBalance += token.rewardsValue;
            }
        }

        // Calculate average returns per nft
        if (walletTotals.dailyReturns > 0 && walletTotals.stakedNfts > 0) {
            walletTotals.avgDailyNftReturn = walletTotals.dailyReturns / walletTotals.stakedNfts;
        }
    }

    return walletTotals;
}