<script lang="ts">
	import '../app.pcss';
	import type { Address } from 'viem';
	import { onMount } from 'svelte';
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
	import { AppLayout, AppBar, Button, Icon, Menu, MenuItem, Toggle } from 'svelte-ux';
	import LucideChevronDown from '~icons/lucide/chevron-down?raw';
	import LucideChevronUp from '~icons/lucide/chevron-down?raw';
	import LucideLoaderCircle from '~icons/lucide/loader-circle?raw';
	import LucideUnplug from '~icons/lucide/unplug?raw';
	import LucideWallet from '~icons/lucide/wallet?raw';
	import { page } from '$app/stores'
	import { 
		truncateEthAddress,
		getUserWallets,
		getWalletData
	} from '$lib/utils';
    import { 
		setWalletDataCtx, 
		getWalletDataCtx,
		setWalletTotalsCtx,
		getWalletTotalsCtx,
		setStrategyValuesCtx,
	} from '$lib/contexts';
	import { defaultValues } from '$lib/data/defaultCompoundValues';
	import { walletDataStore } from '$lib/stores';

	export let data;
	console.log('🚀 ~ data.initialState:', data.initialState)

	let walletBtnOptions = {
		label: "Disconnect",
	}

    setWalletDataCtx(undefined);
    const walletData = getWalletDataCtx();
	setWalletTotalsCtx(undefined);
	const walletTotals = getWalletTotalsCtx();

	setStrategyValuesCtx(defaultValues);

	// Get user's wallets if available
	async function getTableData(
		signerAddress: Address | string | null,
		chainId: number | null | undefined
	) {
		if ($signerAddress) {
			console.log('🚀 ~ calling getTableData...');
			const userWallets: Address[]|string|null = await getUserWallets(signerAddress);
			console.log('🚀 ~ getTableData ~ userWallets:', userWallets);
			
			// Set the store
			// $walletData = await getWalletData(userWallets, $chainId);
			await walletDataStore.loadData(userWallets, $chainId);
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

	onMount(async () => {
		const erckit = defaultConfig({
			chains: [bsc],
			appName: 'D.E.B.T. Box Strategy',
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
			// if ($signerAddress) getTableData($signerAddress, $chainId);
		});
	});

	let isMenuOpen: boolean = false;

	$: console.log('Connected:', $connected);
	$: console.log('Chain ID:', $chainId);
	$: console.log('Signer address:', $signerAddress);
	$: console.log('Loading:', $loading);
	$: $signerAddress, getTableData($signerAddress, $chainId)
	// $: console.log('$walletData:', $walletData);
</script>

<AppLayout areas="'header header' 'aside main'" navWidth={0}>
<!-- <AppLayout areas="'header header' 'aside main'" navWidth={100}> -->
	<!-- <nav slot="nav" class="h-full w-20"> -->
		<!-- Nav menu -->
		<!-- <NavItem text="Home" currentUrl={$page.url} path="/" class="p-5" /> -->
	<!-- </nav> -->

	<AppBar title="Debt Box Strategy" menuIcon={null}>
		<div slot="actions">
			<!-- App actions -->
			{#if $loading}
				<Button rounded="full" icon={LucideLoaderCircle} iconOnly classes={{icon:"animate-spin"}} loading class="pl-10 pr-10" variant="outline" color="info" />
			{:else if $connected && $signerAddress}
				<Toggle let:on={open} let:toggle>
					<Button icon={LucideWallet} rounded="full" variant="outline" color="primary" on:click={toggle}>
						{truncateEthAddress($signerAddress)}
						<Icon data={LucideChevronDown} />
						<Menu {open} on:close={toggle} matchWidth let:close>
							<div class="p-2">
								<MenuItem
									icon={LucideUnplug}
									classes={{
										icon: "text-danger pr-2",
									}}
									on:click={disconnectWagmi}
								>
									Disconnect
								</MenuItem>
							</div>
						</Menu>
					</Button>
				</Toggle>
			{:else}
				<Button icon={LucideWallet} rounded="full" variant="outline" color="secondary" on:click={connectToEthereum}>Connect Wallet</Button>
			{/if}
		</div>
	</AppBar>

	<main class="p-5">
		<slot />
	</main>
</AppLayout>
