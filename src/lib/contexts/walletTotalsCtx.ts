import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { WalletTotals, WalletTotalsContext } from '$lib/types';

export function setWalletTotalsCtx(data: WalletTotals|undefined) {
	const walletTotals = writable<WalletTotals>(data);
	setContext('walletTotals', walletTotals);
}

export function getWalletTotalsCtx() {
	return getContext<WalletTotalsContext>('walletTotals');
}
