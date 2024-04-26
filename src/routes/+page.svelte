<script lang="ts">
	import type { DebtBoxProject, DebtBoxToken, Options, ProjectsTableData } from '$lib/types';
	import { browser } from '$app/environment';
	import { connected, chainId, signerAddress, loading } from 'svelte-wagmi';
	import type { Address } from 'viem';
	import { Tab, Tabs, Card } from 'svelte-ux';
	import { getUserWallets, getWalletData } from '$lib/utils/walletUtils';
	import { ProjectsTable } from '$lib/components';

	// export let data;
	// let userWallets: Address[] = [];
    // let walletData: Array<ProjectsTableData[]>|void;
    let value: ProjectsTableData[] = [];
    let walletData: Options = []

	// Get user's wallets if available
    async function getTableData(signerAddress: Address|string|null, chainId: number|null|undefined) {
        console.log("🚀 ~ calling getTableData...")
        const userWallets: Address[] = await getUserWallets(signerAddress);
        console.log("🚀 ~ getTableData ~ userWallets:", userWallets)
        walletData = await getWalletData(userWallets, $chainId);
        value = walletData[0].value;
    }

	// let projects: DebtBoxProject[] | undefined = data.debtBoxData?.projects;
	// let tokens: DebtBoxToken[] | undefined = data.debtBoxData?.tokens;

	// $: async () => (walletData = await getTableData($signerAddress, $chainId));
	// $: console.log("🚀 ~ walletData:", walletData)
	$: console.log('🚀 ~ $signerAddress:', $signerAddress);
	$: console.log('🚀 ~ value:', value);
    $: console.log('walletData:', walletData)
	// $: console.log('🚀 ~ userWallets:', userWallets);
</script>

<p>Connected: {$connected ? 'Yes' : 'No'}</p>
<p>Chain ID: {$chainId}</p>
<p>Signer address: {$signerAddress}</p>

{#if $loading}
	<p>Loading data...</p>
{:else if $connected && $signerAddress}
    {#await getTableData($signerAddress, $chainId)}
        <Card loading class="p-5 m-5 min-h-20" />
    {:then}
        <Tabs
            options={walletData}
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
    {:catch}
        <Card class="p-5 m-5 min-h-20">
            <p>Could not fetch token data.</p>
        </Card>
    {/await}
{/if}
