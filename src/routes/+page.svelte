<script lang="ts">
    import type { TokensData } from '$lib/types';
    import { getWalletDataCtx, getWalletTotalsCtx } from '$lib/contexts'
	import { connected, chainId, signerAddress, loading } from 'svelte-wagmi';
	import { Tab, Tabs, Card } from 'svelte-ux';
	import { CompoundsChart, TokensTable, RewardsCollectionTarget, SummaryCard, GoalsWidget } from '$lib/components';

	// export let data;
    let value: TokensData;
    const walletData = getWalletDataCtx();
    const walletTotals = getWalletTotalsCtx();


	$: console.log('🚀 ~ $signerAddress:', $signerAddress);
	// $: console.log('🚀 ~ value:', value);
    $: console.log('$walletData:', $walletData)
    $: console.log('$walletTotals:', $walletTotals)
	// $: console.log('🚀 ~ userWallets:', userWallets);
    $: $walletData && $walletData.length > 0 && !value ? value = $walletData[0].value : '';
</script>
{#if $loading}
	<p>Connecting wallet...</p>
{:else if $connected && $signerAddress}
    {#if $walletTotals}
        <SummaryCard walletTotals={$walletTotals} />
    {/if}
    {#if $walletData}
        <Tabs
            options={$walletData}
            placement="top"
            bind:value
            classes={{
                root: 'my-5 overflow-hidden',
                content: 'border px-4 py-5 rounded-b rounded-tr',
                tab: { root: 'rounded-t' }
            }}
        >
            <svelte:fragment slot="content" let:value>
                <RewardsCollectionTarget walletTotals={value.totals} />
                <CompoundsChart walletTotals={value.totals} />
                <GoalsWidget />
                <TokensTable tokenData={value.tokens} />
            </svelte:fragment>
        </Tabs>
    {:else}   
        <Card loading class="p-5 m-5 min-h-20" />
    {/if}
{/if}
