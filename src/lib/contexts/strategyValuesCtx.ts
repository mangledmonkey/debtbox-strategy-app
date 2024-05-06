import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import type { StrategyValues, StrategyValuesContext } from '$lib/types'


export function setStrategyValuesCtx(data: StrategyValues) {
	const strategyValues = writable<StrategyValues>(data)
	setContext('strategyValues', strategyValues)
}

export function getStrategyValuesCtx() {
	return getContext<StrategyValuesContext>('strategyValues')
}
