// src/lib/stores/dataStore.js
import type { Address } from 'viem';
import type { Options } from '$lib/types';
import { writable } from 'svelte/store';
import { getWalletData } from '../services/walletDataService';  // Importing from service

function createWalletDataStore() {
    const { subscribe, set } = writable<Options>();

    async function loadData(wallets: Address[]|string|null, chainId: number|null|undefined ) {
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
