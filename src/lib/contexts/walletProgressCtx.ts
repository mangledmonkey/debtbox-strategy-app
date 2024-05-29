import type { WalletProgressData, WalletProgressDataContext } from '$lib/types';
import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';


export function setWalletProgressCtx(data: WalletProgressData|undefined) {
	const walletProgressData = writable<WalletProgressData>(data);
	setContext('walletProgressData', walletProgressData);
}

export function getWalletProgressCtx() {
	return getContext<WalletProgressDataContext>('walletProgressData');
}
