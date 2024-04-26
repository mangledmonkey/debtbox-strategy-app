import type { Address } from "viem";
import type { Options, ProjectsTableData } from "$lib/types";

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