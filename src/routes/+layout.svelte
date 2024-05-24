<script lang="ts">
	import '../app.pcss';
	import type { Address } from 'viem';
	import type { WalletDataContext, WalletTotalsContext, Wallets, WalletsContext } from '$lib/types';
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
	import { AppLayout, AppBar, Button, Icon, Menu, MenuItem, Toggle } from 'svelte-ux';
	import LucideChevronDown from '~icons/lucide/chevron-down?raw';
	// import LucideChevronUp from '~icons/lucide/chevron-down?raw';
	import LucideLoaderCircle from '~icons/lucide/loader-circle?raw';
	import LucideUnplug from '~icons/lucide/unplug?raw';
	import LucideWallet from '~icons/lucide/wallet?raw';
	import { Footer, Logo } from '$lib/components';
	import { 
		truncateEthAddress,
		getUserWallets,
		getWalletData
	} from '$lib/utils';
    import { 
		setWalletsCtx,
		getWalletsCtx,
		setWalletDataCtx, 
		getWalletDataCtx,
		setWalletTotalsCtx,
		getWalletTotalsCtx,
		setStrategyValuesCtx,
	} from '$lib/contexts';
	import { defaultValues } from '$lib/data/defaultCompoundValues';
	import { walletDataStore } from '$lib/stores';
	import consola from 'consola';
	import { setContext } from 'svelte';

	let { data, children } = $props();
	console.log('🚀 ~ data.initialState:', data.initialState)

	setWalletsCtx([]);
	const wallets: WalletsContext = getWalletsCtx();
	
	let walletsObservable: Observable<Wallets> = liveQuery<Wallets>(
		() => db.wallets.toArray()
	)
	console.log('🚀 ~ walletsObservable:', walletsObservable)

	walletsObservable.subscribe({
		next: result => $wallets = result,
		error: error => consola.error(error),
	})

    setWalletDataCtx(undefined);
    const walletData: WalletDataContext = getWalletDataCtx();
	setWalletTotalsCtx(undefined);
	const walletTotals: WalletTotalsContext = getWalletTotalsCtx();

	setStrategyValuesCtx(defaultValues);

	let tableDataLoaded = $state(false);

		// Get user's wallets if available
	async function getTableData(
		signerAddress: Address | string | null,
		chainId: number | null | undefined
	) {
		if ($signerAddress) {
			console.log('🚀 ~ calling getTableData...');
			// const userWallets: Address[]|string|null = await getUserWallets(signerAddress);
			// const primaryWallet = 
			
			console.log('🚀 ~ getTableData ~ $wallets:', $wallets);
			
			// Set the store
			// await walletDataStore.loadData($wallets, chainId);
			console.log('🚀 ~ $walletDataStore:', $walletDataStore)
			$walletData = $walletDataStore;

			if ($walletDataStore && $walletDataStore.length > 0) {
				$walletTotals = $walletDataStore[0].value.totals;
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

		if ($connected && !tableDataLoaded && $signerAddress) {
			// setPrimaryWallet($signerAddress, wallets)
			getTableData($signerAddress, $chainId);
		}
	})

	$inspect('Connected:', $connected);
	$inspect('Chain ID:', $chainId);
	$inspect('Signer address:', $signerAddress);
	$inspect('Loading:', $loading);
	// $: console.log('$walletData:', $walletData);
</script>

<svelte:head>
	<title>DEBT Rewards Strategy</title>
</svelte:head>

<AppLayout classes={{root: "min-h-screen"}} areas="'header header' 'main'" navWidth={0}>
<!-- <AppLayout areas="'header header' 'aside main'" navWidth={100}> -->
	<!-- <nav slot="nav" class="h-full w-20"> -->
		<!-- Nav menu -->
		<!-- <NavItem text="Home" currentUrl={$page.url} path="/" class="p-5" /> -->
	<!-- </nav> -->

	<AppBar class="bg-surface-100" menuIcon={null}>
		<a href="/" class="flex flex-row items-center text-white active:no-underline hover:no-underline">
			<Logo name="logo" />
			<div class="ml-2 text-xl font-medium">DEBT Rewards Strategy</div>
		</a>
		<div slot="actions">
			<!-- App actions -->
			{#if $loading}
				<Button rounded="full" icon={LucideLoaderCircle} iconOnly classes={{icon:"animate-spin"}} loading class="pl-10 pr-10" variant="outline" color="info" />
			{:else if $connected && $signerAddress}
				<Toggle let:on={open} let:toggle>
					<Button icon={LucideWallet} rounded="full" variant="outline" color="primary" onclick={toggle}>
						{truncateEthAddress($signerAddress)}
						<Icon data={LucideChevronDown} />
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
			{:else}
				<Button icon={LucideWallet} rounded="full" variant="outline" color="secondary" onclick={connectToEthereum}>Connect Wallet</Button>
			{/if}
		</div>
	</AppBar>

	<main class="h-full flex flex-col justify-between">
		{@render children()}
		<Footer />
	</main>
</AppLayout>
