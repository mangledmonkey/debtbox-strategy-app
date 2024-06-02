// src/lib/stores/dataStore.js
import type { Options, WalletProgressDataContext, Wallets } from '$lib/types';
import { writable } from 'svelte/store';
import { getWalletData } from '../services/walletDataService';  // Importing from service

function createWalletDataStore() {
    const { subscribe, set } = writable<Options>();

    async function loadData(
        wallets: Wallets|undefined,
        signerAddress: string,
        chainId: number|null|undefined,
        walletProgress: WalletProgressDataContext
    ) {
        let data: Options = [];

        if (wallets && chainId) {
            data = await getWalletData(
                wallets,
                signerAddress,
                chainId,
                walletProgress
            );
        }
        
        set(data);
    }

    return {
        subscribe,
        loadData
    };
}

export const walletDataStore = createWalletDataStore();
