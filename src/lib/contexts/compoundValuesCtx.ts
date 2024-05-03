import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import type { DefaultValues } from '$lib/types'

type Context = Writable<DefaultValues>

export function setCompoundValuesCtx(data: DefaultValues) {
	const compoundValues = writable<DefaultValues>(data)
	setContext('compoundValues', compoundValues)
}

export function getCompoundValuesCtx() {
	return getContext<Context>('compoundValues')
}
