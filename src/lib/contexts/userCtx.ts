import type { User, UserContext } from '$lib/types';
import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';


export function setUserCtx(data: User|undefined) {
	const user = writable<User|undefined>(data);
	setContext('user', user);
}

export function getUserCtx() {
	return getContext<UserContext>('user');
}
