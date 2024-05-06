import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import type { Options, WalletDataContext } from '$lib/types'


export function setWalletDataCtx(data: Options|undefined) {
	const walletData = writable<Options>(data)
	setContext('walletData', walletData)
}

export function getWalletDataCtx() {
	return getContext<WalletDataContext>('walletData')
}
