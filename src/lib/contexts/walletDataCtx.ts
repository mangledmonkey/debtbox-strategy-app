import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import type { Options } from '$lib/types'

type Context = Writable<Options>

export function setWalletDataCtx(data: Options|undefined) {
	const walletData = writable<Options>(data)
	setContext('walletData', walletData)
}

export function getWalletDataCtx() {
	return getContext<Context>('walletData')
}
