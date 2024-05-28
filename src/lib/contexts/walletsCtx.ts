import type { Wallets, WalletsContext } from '$lib/types';
import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';


export function setWalletsCtx(data: Wallets) {
	const wallets = writable<Wallets>(data);
	setContext('wallets', wallets);
}

export function getWalletsCtx() {
	return getContext<WalletsContext>('wallets');
}
