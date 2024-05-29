<script lang="ts">
	import '../app.pcss';
	import type { Address } from 'viem';
	import type {
		Goals,
		GoalsContext,
		WalletDataContext,
		WalletTotalsContext,
		Wallets,
		WalletsContext
	} from '$lib/types';
	import { defaultConfig, WC} from 'svelte-wagmi';
	import { bsc } from '@wagmi/core/chains';
	import { 
		connected,
		chainId, 
		signerAddress, 
		loading, 
		disconnectWagmi
	} from 'svelte-wagmi';
	import { PUBLIC_WALLETCONNECT_ID, PUBLIC_ALCHEMY_ID } from '$env/static/public';
	import { injected, walletConnect } from '@wagmi/connectors';
	import { liveQuery, type Observable } from 'dexie';
	import { db } from '$lib/db';
	import { AppLayout, AppBar, Button, Icon, Menu, MenuItem, NavItem, Toggle } from 'svelte-ux';
	import LucideChevronDown from '~icons/lucide/chevron-down?raw';
	// import LucideChevronUp from '~icons/lucide/chevron-down?raw';
	import LucideLoaderCircle from '~icons/lucide/loader-circle?raw';
	import LucideUnplug from '~icons/lucide/unplug?raw';
	import LucideWallet from '~icons/lucide/wallet?raw';
	import { Footer, Logo } from '$lib/components';
	import { 
		truncateEthAddress,
	} from '$lib/utils';
    import { 
		setWalletsCtx,
		getWalletsCtx,
		setWalletDataCtx, 
		setWalletProgressCtx,
		setWalletTotalsCtx,
		setStrategyValuesCtx,
		setGoalsCtx,
		getGoalsCtx,
		setTableDataStatusCtx,
		getWalletDataCtx,
		getWalletProgressCtx,
		getWalletTotalsCtx,
		getTableDataStatusCtx,
	} from '$lib/contexts';
	import { defaultValues } from '$lib/data/defaultCompoundValues';
	import consola from 'consola';
	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import { walletDataStore } from '$lib/stores';


	let { data, children } = $props();
	console.log('🚀 ~ data.initialState:', data.initialState)

	// Wallets
	setWalletsCtx([]);
	const wallets: WalletsContext = getWalletsCtx();
	
	let walletsObservable: Observable<Wallets> = liveQuery<Wallets>(
		() => db.wallets.toArray()
	)
	walletsObservable.subscribe({
		next: result => $wallets = result,
		error: error => consola.error(error),
	})

	// Goals
	setGoalsCtx([]);
	const goals: GoalsContext = getGoalsCtx();

	let goalsObservable: Observable<Goals> = liveQuery<Goals>(
		() => db.goals.toArray()
	)
	goalsObservable.subscribe({
		next: result => $goals = result,
		error: error => consola.error(error),
	})

	// // Wallet Loading Progress
	setWalletProgressCtx(undefined);

	// Table data status
	setTableDataStatusCtx({
		loading: false,
		loaded: false,
	})

	// // Wallet Data
    setWalletDataCtx(undefined);
    const walletData: WalletDataContext = getWalletDataCtx();

	setWalletTotalsCtx(undefined);
	const walletTotals: WalletTotalsContext = getWalletTotalsCtx();

	setStrategyValuesCtx(defaultValues);

	// Wallet Loading Progress
	const walletProgress = getWalletProgressCtx();

	// Wallet Data
	const tableDataStatus = getTableDataStatusCtx();

	// Get user's wallets if available
	async function getTableData() {
		if (
			!$tableDataStatus.loaded
			&& !$tableDataStatus.loading
		) {

			if ($signerAddress || $wallets) {
				$tableDataStatus.loading = true;
				$tableDataStatus.loaded = false;
				console.log('🚀 ~ calling getTableData...');
				// const userWallets: Address[]|string|null = await getUserWallets(signerAddress);
				// const primaryWallet = 
				
				console.log('🚀 ~ getTableData ~ $wallets:', $wallets);
				
				// Set the store
				await walletDataStore.loadData($wallets, $chainId, walletProgress);
				console.log('🚀 ~ $walletDataStore:', $walletDataStore)
				$walletData = $walletDataStore;
				
				if ($walletDataStore && $walletDataStore.length > 0) {
					$walletTotals = $walletDataStore[0].value.totals;
					$tableDataStatus.loaded = true;
				}
				
				$tableDataStatus.loading = false;
			}
		}
	}

	// export let data;
	async function connectToEthereum() {
		await WC();
	}
	setContext('connectToEthereum', connectToEthereum);

	async function initWeb3Connect() {
		const erckit = defaultConfig({
			chains: [bsc],
			appName: 'DEBT Rewards Strategy',
			walletConnectProjectId: PUBLIC_WALLETCONNECT_ID,
			alchemyId: PUBLIC_ALCHEMY_ID,
			connectors: [
				injected(),
				walletConnect({
					projectId: PUBLIC_WALLETCONNECT_ID
				})],
		});
		await erckit.init()
        .then(() => {
		});
	};

	$effect(() => {
		if (!$connected) {
			initWeb3Connect()
		}
	})

	$effect(() => {
		if (
			!$tableDataStatus.loaded
			&& !$tableDataStatus.loading
			&& (!$walletData || $walletData.length === 0)
			&& (
				$connected
				&& $signerAddress
				|| $wallets
			)
		) {
			getTableData();
		}
	})

	$inspect('Connected:', $connected);
	$inspect('Chain ID:', $chainId);
	$inspect('Signer address:', $signerAddress);
	$inspect('Loading:', $loading);
	$inspect('layout $wallets:', $wallets);
	// $: console.log('$walletData:', $walletData);
</script>

<svelte:head>
	<title>DEBT Rewards Strategy</title>
</svelte:head>

<AppLayout areas="'header header' 'aside main'" navWidth={0}>
	<!-- {#if $connected} -->
<!-- <AppLayout areas="'header header' 'aside main'" navWidth={100}> -->
	
	<!-- {/if} -->

	<AppBar class="bg-surface-100" menuIcon={null}>
		<a href="/" class="flex flex-row items-center text-white active:no-underline hover:no-underline">
			<Logo name="logo" />
			<div class="ml-2 text-xs sm:text-md md:text-xl font-medium">DEBT Rewards Strategy</div>
		</a>
		<div slot="actions" class="flex flex-row items-middle gap-5">
				<!-- App actions -->
			{#if $loading}
				<Button rounded="full"
					icon={LucideLoaderCircle}
					iconOnly
					classes={{icon:"animate-spin"}}
					loading
					class="pl-10 pr-10"
					variant="outline"
					color="info" />
			{:else if $connected && $signerAddress}
				<nav class="flex flex-row items-middle">
					<!-- Nav menu -->
					<NavItem text="Dashboard" currentUrl={$page.url} path="/dashboard" class="p-2"  />
					<NavItem text="Wallets" currentUrl={$page.url} path="/wallets" class="p-2" />
					<!-- {@render nav()} -->
				</nav>
				<div id="navWalletButton" class="m-auto">
					<Toggle let:on={open} let:toggle>
						<Button
							icon={LucideWallet}
							rounded="full"
							variant="outline"
							color="primary"
							onclick={toggle}
						>
							{truncateEthAddress($signerAddress)}
							<Icon svg={LucideChevronDown.toString()} />
							<Menu {open} on:close={toggle} matchWidth let:close>
								<div class="p-2">
									<MenuItem
										icon={LucideUnplug}
										classes={{
											icon: "text-danger pr-2",
										}}
										onclick={disconnectWagmi}
									>
										Disconnect
									</MenuItem>
								</div>
							</Menu>
						</Button>
					</Toggle>
				</div>
			{:else}
				<Button icon={LucideWallet} rounded="full" variant="outline" color="secondary" onclick={connectToEthereum}>Connect Wallet</Button>
			{/if}
		</div>
	</AppBar>
	
	<main class="flex-grow overflow-y-scroll">
		{@render children()}
		<Footer />
	</main>
</AppLayout>
