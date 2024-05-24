// src/lib/stores/dataStore.js
import type { Options, Wallets } from '$lib/types';
import { writable } from 'svelte/store';
import { getWalletData } from '../services/walletDataService';  // Importing from service

function createWalletDataStore() {
    const { subscribe, set } = writable<Options>();

    async function loadData(wallets: Wallets|undefined, chainId: number|null|undefined ) {
        let data: Options = [];

        if (wallets && chainId) {
            data = await getWalletData(wallets, chainId);
        }
        
        set(data);
    }

    return {
        subscribe,
        loadData
    };
}

export const walletDataStore = createWalletDataStore();
