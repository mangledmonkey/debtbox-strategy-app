<script lang="ts">
	import '../app.pcss';
	import { browser } from '$app/environment';
	import type { Address } from 'viem';
    import type { Options } from '$lib/types';
	import { onMount } from 'svelte';
	import { defaultConfig } from 'svelte-wagmi';
	import { mainnet, bsc } from '@wagmi/core/chains';
	import { connected, chainId, signerAddress, loading, disconnectWagmi } from 'svelte-wagmi';
	import { WC } from 'svelte-wagmi';
	import { PUBLIC_WALLETCONNECT_ID, PUBLIC_ALCHEMY_ID } from '$env/static/public';
	import { injected } from '@wagmi/connectors';
	import { AppLayout, AppBar, NavItem, Button } from 'svelte-ux';
	import LoaderCircle from '~icons/lucide/loader-circle';
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';
	import { truncateEthAddress, getUserWallets, getWalletData } from '$lib/utils';
    import { setWalletDataCtx, getWalletDataCtx } from '$lib/walletDataCtx';

    setWalletDataCtx(undefined)
    const walletData = getWalletDataCtx();

	// Get user's wallets if available
	async function getTableData(
		signerAddress: Address | string | null,
		chainId: number | null | undefined
	) {
		console.log('🚀 ~ calling getTableData...');
		const userWallets: Address[] = await getUserWallets(signerAddress);
		console.log('🚀 ~ getTableData ~ userWallets:', userWallets);

		// Set the store
		$walletData = await getWalletData(userWallets, $chainId);
	}

	// export let data;
	async function connectToEthereum() {
		await WC();
	}

	onMount(async () => {
		const erckit = defaultConfig({
			chains: [mainnet, bsc],
			appName: 'D.E.B.T. Box Strategy',
			walletConnectProjectId: PUBLIC_WALLETCONNECT_ID,
			alchemyId: PUBLIC_ALCHEMY_ID,
			connectors: [injected()]
		});
		await erckit.init()
        .then(() => {
			getTableData($signerAddress, $chainId);
		});
	});

	$: console.log('Connected:', $connected);
	$: console.log('Chain ID:', $chainId);
	$: console.log('Signer address:', $signerAddress);
	$: console.log('Loading:', $loading);
	$: console.log('$walletData:', $walletData);
</script>

<AppLayout areas="'header header' 'aside main'" navWidth={100}>
	<nav slot="nav" class="h-full w-20">
		<!-- Nav menu -->
		<NavItem text="Home" currentUrl={$page.url} path="/" class="p-5" />
	</nav>

	<AppBar title="Debt Box Strategy">
		<div slot="actions">
			<!-- App actions -->
			{#if $loading}
				<Button class="pl-10 pr-10">
					<LoaderCircle class="animate-spin" />
				</Button>
			{:else if $connected && $signerAddress}
				<Button fill color="primary" on:click={disconnectWagmi}>
					{truncateEthAddress($signerAddress)}
					disconnect
				</Button>
			{:else}
				<Button fill color="secondary" on:click={connectToEthereum}>Connect Wallet</Button>
			{/if}
		</div>
	</AppBar>

	<main class="p-10">
		<slot />
	</main>
</AppLayout>
