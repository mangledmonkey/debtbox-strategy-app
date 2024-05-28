import type { Goals, GoalsContext } from '$lib/types';
import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';


export function setGoalsCtx(data: Goals) {
	const goals = writable<Goals>(data);
	setContext('goals', goals);
}

export function getGoalsCtx() {
	return getContext<GoalsContext>('goals');
}
