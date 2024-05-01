<script lang="ts">
    import type { DebtBoxProject, DebtBoxToken, Options, TokenData } from '$lib/types';
    import { getWalletDataCtx, getWalletTotalsCtx } from '$lib/contexts'
	import { connected, chainId, signerAddress, loading } from 'svelte-wagmi';
	import { Tab, Tabs, Card } from 'svelte-ux';
	import { ProjectsTable } from '$lib/components';

	// export let data;
    let value: TokenData[] = [];
    const walletData = getWalletDataCtx();
    const walletTotals = getWalletTotalsCtx();

	$: console.log('🚀 ~ $signerAddress:', $signerAddress);
	// $: console.log('🚀 ~ value:', value);
    $: console.log('$walletData:', $walletData)
    $: console.log('$walletTotals:', $walletTotals)
	// $: console.log('🚀 ~ userWallets:', userWallets);
    $: $walletData && value.length === 0 ? value = $walletData[0].value : '';
</script>
{#if $loading}
	<p>Loading data...</p>
{:else if $connected && $signerAddress}
    {#if $walletTotals}
        <Card class="mt-5">
            <div class="flex gap-2 p-4 justify-between">
                <div class="flex flex-col text-center">
                    <strong>Daily Rewards</strong>
                    <span class="text-3xl">${$walletTotals.dailyReturns}</span>
                </div>
                <div class="flex flex-col text-center">
                    <strong>Rewards Balance</strong>
                    <span class="text-3xl">${$walletTotals.rewardsBalance}</span>
                </div>
                <div class="flex flex-col text-center">
                    <strong>Wallet Balance</strong>
                    <span class="text-3xl">${$walletTotals.walletBalance}</span>
                </div>
                <div class="flex flex-col text-center">
                    <strong>Total Value</strong>
                    <span class="text-3xl">${ $walletTotals.rewardsBalance + $walletTotals.walletBalance }</span>
                </div>
                <div class="flex flex-col text-center">
                    <strong>Staked NFTs</strong>
                    <span class="text-3xl">{$walletTotals.stakedNfts}</span>
                </div>
                <div class="flex flex-col text-center">
                    <strong>Unstaked NFTs</strong>
                    <span class="text-3xl">{$walletTotals.unstakedNfts}</span>
                </div>
            </div>
        </Card>
    {/if}
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
                    tokenData={value.tokens}
                />
            </svelte:fragment>
        </Tabs>
    {:else}   
        <Card loading class="p-5 m-5 min-h-20" />
    {/if}
{/if}
