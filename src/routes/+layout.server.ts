// import { getDebtBoxData } from "$lib/utils";
import { config } from '$lib/configs/wagamiConfig.js';
import { cookieToInitialState } from '@wagmi/core';

/** @type {import('./$types').LayoutLoad} */
export async function load({ cookies }) {
console.log('🚀 ~ load ~ cookies:', cookies.get('wagmi.store'))

	const initialState = cookieToInitialState(
		config,
		cookies.get('wagmi.store'),
	)
	console.log('🚀 ~ load ~ initialState:', initialState)

	// const debtBoxData = await getDebtBoxData();

	return {
		initialState,
	}
}