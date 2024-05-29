<script lang="ts">
	import type { TokensData, WalletDataContext } from '$lib/types';
	import {
		getWalletDataCtx,
	} from '$lib/contexts';
	import { connected, signerAddress, loading } from 'svelte-wagmi';
	import { Tabs } from 'svelte-ux';
	import {
		CompoundsChart,
		Goals,
		NftsChart,
		PurchasePriority,
		RewardsCollectionTarget,
		SummaryCard,
		TokensTable,
		WalletProgress
	} from '$lib/components';
	import { goto } from '$app/navigation';

	let { connectToEthereum } = $props();

	// export let data;
	let value: TokensData|undefined = $state();
    const walletData: WalletDataContext = getWalletDataCtx();

	$effect(() => {
		if ($walletData && $walletData.length > 0 && !value) value = $walletData[0].value;
	});

	$inspect('🚀 ~ $signerAddress:', $signerAddress);
	$inspect('$walletData:', $walletData);
	$inspect('value:', value)
</script>

{#if $loading || $connected && $signerAddress}
	{#if $walletData && value}
		<article class="mt-2 sm:p-5">
			<Tabs
				options={$walletData}
				placement="top"
				bind:value
				classes={{
					root: 'overflow-hidden',
					content: 'border px-2 sm:px-4 py-5 rounded-b rounded-tr',
					tab: { root: 'rounded-t' }
				}}
			>
				<svelte:fragment slot="content" let:value>
					<div class="flex flex-col gap-5">
						<SummaryCard walletTotals={value.totals} />
						<RewardsCollectionTarget walletTotals={value.totals} />
						<CompoundsChart walletTotals={value.totals} />
						<Goals />
						<div class="flex w-full flex-col-reverse md:gap-5 md:flex-row">
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
		<WalletProgress />
	{/if}
{:else if !$loading && !$connected && !$signerAddress}
	{goto('/')}
{/if}
