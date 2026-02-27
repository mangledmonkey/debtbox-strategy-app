<script lang="ts">
	import type { TokensData, UserContext, WalletDataContext, WalletTotalsContext, WalletsContext } from '$lib/types';
	import {
	getTableDataStatusCtx,
		getUserCtx,
		getWalletDataCtx,
		getWalletProgressCtx,
		getWalletTotalsCtx,
		getWalletsCtx,
	} from '$lib/contexts';
	import { connected, chainId, signerAddress, loading } from 'svelte-wagmi';
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
	import { walletDataStore } from '$lib/stores';
	import consola from 'consola';

	let { connectToEthereum } = $props();

	// export let data;

	const user: UserContext = getUserCtx();
	const wallets: WalletsContext = getWalletsCtx();
    const walletData: WalletDataContext = getWalletDataCtx();

	const walletTotals: WalletTotalsContext = getWalletTotalsCtx();

	// Wallet Loading Progress
	const walletProgress = getWalletProgressCtx();

	// Wallet Data
	const tableDataStatus = getTableDataStatusCtx();

	let walletsLoaded: boolean = $derived.by(() => {
		let loaded: boolean = false;
		if ($walletProgress) {
			loaded = ($walletProgress?.status.stage / $walletProgress?.status.stages) >= 1
		}
		return loaded;
	});
	$inspect('🚀 ~ letwalletsLoaded:boolean=$derived.by ~ walletsLoaded:', walletsLoaded)

	async function getTableData() {
		if (
			!$tableDataStatus.loaded
			&& !$tableDataStatus.loading
			&& $signerAddress
			&& $user
			&& ($wallets && $wallets.length > 0)
		) {
			consola.info('🚀 ~ calling getTableData...');
			$tableDataStatus.loading = true;
			$tableDataStatus.loaded = false;
			
			console.log('🚀 ~ getTableData ~ $wallets:', $wallets);

			// Set the store
			await walletDataStore.loadData(
				$wallets,
				$signerAddress,
				$chainId,
				walletProgress);
			console.log('🚀 ~ $walletDataStore:', $walletDataStore)
			$walletData = $walletDataStore;
			
			if ($walletDataStore && $walletDataStore.length > 0) {
				$walletTotals = $walletDataStore[0].value.totals;
				$tableDataStatus.loaded = true;
				$tableDataStatus.loading = false;
			}
			
		}
	}

	$effect(() => {
		if (
			!$tableDataStatus.loaded
			&& !$tableDataStatus.loading
			&& (!$walletData || $walletData.length === 0)
			&& (
				$connected
				&& $signerAddress
				&& $user
			)
		) {
			getTableData();
		}
	})
	
	let value: TokensData|undefined = $state();
	$effect(() => {
		if ($walletData && $walletData.length > 0 && !value) value = $walletData[0].value;
	});
	console.log('🚀 ~ $tableDataStatus.loading:', $tableDataStatus.loading);
	console.log('🚀 ~ $tableDataStatus.loaded:', $tableDataStatus.loaded);
	$inspect('🚀 ~ $signerAddress:', $signerAddress);
	$inspect('$walletData:', $walletData);
	$inspect('value:', value)
</script>

{#if $connected && $signerAddress}
	{#if $walletData?.length > 0 && value && walletsLoaded}
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
