import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import type { CompoundValues, CompoundValuesContext } from '$lib/types'


export function setCompoundValuesCtx(data: CompoundValues|undefined) {
	const compoundValues = writable<CompoundValues>(data)
	setContext('compoundValues', compoundValues)
}

export function getCompoundValuesCtx() {
	return getContext<CompoundValuesContext|undefined>('compoundValues')
}
