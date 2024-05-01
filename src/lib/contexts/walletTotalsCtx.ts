import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import type { WalletTotals } from '$lib/types'

type Context = Writable<WalletTotals|undefined>

export function setWalletTotalsCtx(data: WalletTotals|undefined) {
	const walletTotals = writable<WalletTotals>(data)
	setContext('walletTotals', walletTotals)
}

export function getWalletTotalsCtx() {
	return getContext<Context>('walletTotals')
}
