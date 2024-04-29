<script lang="ts">
    import type { DebtBoxProject, DebtBoxToken, Options, ProjectsTableData } from '$lib/types';
    import { getContext } from 'svelte';
    import { getWalletDataCtx } from '$lib/walletDataCtx'
	import { browser } from '$app/environment';
	import { connected, chainId, signerAddress, loading } from 'svelte-wagmi';
	import type { Address } from 'viem';
	import { Tab, Tabs, Card } from 'svelte-ux';
	import { getUserWallets, getWalletData } from '$lib/utils/walletUtils';
	import { ProjectsTable } from '$lib/components';
	import type { Stores, StoresValues } from 'svelte/store';

	// export let data;
	// let userWallets: Address[] = [];
    // let walletData: Array<ProjectsTableData[]>|void;
    let value: ProjectsTableData[] = [];
    const walletData = getWalletDataCtx()

	// // Get user's wallets if available
    // async function getTableData(signerAddress: Address|string|null, chainId: number|null|undefined) {
    //     console.log("🚀 ~ calling getTableData...")
    //     const userWallets: Address[] = await getUserWallets(signerAddress);
    //     console.log("🚀 ~ getTableData ~ userWallets:", userWallets)
    //     walletData = await getWalletData(userWallets, $chainId);
    //     value = walletData[0].value;
    // }

	// let projects: DebtBoxProject[] | undefined = data.debtBoxData?.projects;
	// let tokens: DebtBoxToken[] | undefined = data.debtBoxData?.tokens;

	// $: async () => (walletData = await getTableData($signerAddress, $chainId));
	// $: console.log("🚀 ~ walletData:", walletData)
	$: console.log('🚀 ~ $signerAddress:', $signerAddress);
	$: console.log('🚀 ~ value:', value);
    $: console.log('$walletData:', $walletData)
	// $: console.log('🚀 ~ userWallets:', userWallets);
    $: $walletData && value.length === 0 ? value = $walletData[0].value: '';
</script>

<p>Connected: {$connected ? 'Yes' : 'No'}</p>
<p>Chain ID: {$chainId}</p>
<p>Signer address: {$signerAddress}</p>

{#if $loading}
	<p>Loading data...</p>
{:else if $connected && $signerAddress}
    {#if $walletData}
        <Tabs
            options={$walletData}
            placement="top"
            bind:value
            classes={{
                root: 'my-5',
                content: 'border px-4 py-5 rounded-b rounded-tr',
                tab: { root: 'rounded-t' }
            }}
        >            
            <svelte:fragment slot="content" let:value>
                <ProjectsTable
                    tokenData={value}
                />
            </svelte:fragment>
        </Tabs>
    {:else}   
        <Card loading class="p-5 m-5 min-h-20" />
    {/if}
{/if}
