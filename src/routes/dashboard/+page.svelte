<script lang="ts">
	import type { TokensData } from '$lib/types';
	import { getWalletDataCtx, getWalletTotalsCtx } from '$lib/contexts';
	import { connected, chainId, signerAddress, loading } from 'svelte-wagmi';
	import LucideLoaderCircle from '~icons/lucide/loader-circle?raw';
	import { Tab, Tabs, Button, Card, Icon } from 'svelte-ux';
	import {
		CompoundsChart,
		GoalsWidget,
		NftsChart,
		PurchasePriority,
		RewardsCollectionTarget,
		SummaryCard,
		TokensTable
	} from '$lib/components';
	import { goto } from '$app/navigation';

	let { connectToEthereum } = $props();

	// export let data;
	let value: TokensData|undefined = $state();
	const walletData = getWalletDataCtx();
	// const walletTotals = getWalletTotalsCtx();

	$inspect('🚀 ~ $signerAddress:', $signerAddress);
	// $: console.log('🚀 ~ value:', value);
	$inspect('$walletData:', $walletData);
	// $: console.log('$walletTotals:', $walletTotals)
	// $: console.log('🚀 ~ userWallets:', userWallets);
	$effect(() => {
		if ($walletData && $walletData.length > 0 && !value) value = $walletData[0].value;
	});
</script>

{#if $loading || $connected && $signerAddress}
	{#if $walletData && value}
		<article class="p-5">
			<Tabs
				options={$walletData}
				placement="top"
				bind:value
				classes={{
					root: 'overflow-hidden',
					content: 'border px-4 py-5 rounded-b rounded-tr',
					tab: { root: 'rounded-t' }
				}}
			>
				<svelte:fragment slot="content" let:value>
					<div class="flex flex-col gap-5">
						<SummaryCard walletTotals={value.totals} />
						<RewardsCollectionTarget walletTotals={value.totals} />
						<CompoundsChart walletTotals={value.totals} />
						<GoalsWidget />
						<div class="flex w-full flex-col md:gap-5 lg:flex-row">
							<div class="flex basis-1/5 justify-stretch">
								<PurchasePriority tokenData={value.tokens} />
							</div>
							<div class="basis-4/5">
								<NftsChart tokenData={value.tokens} />
							</div>
						</div>
						<TokensTable tokenData={value.tokens} />
					</div>
				</svelte:fragment>
			</Tabs>
		</article>
	{:else}
		<div class="h-full w-screen flex items-center align-middle text-center">
			<Icon svg={LucideLoaderCircle.toString()} class="animate-spin m-auto text-3xl text-primary" />
		</div>
	{/if}
{:else if !$loading && !$connected && !$signerAddress}
	{goto('/')}
{/if}
