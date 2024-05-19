<script lang="ts">
    import type { TokensData } from '$lib/types';
    import { getWalletDataCtx, getWalletTotalsCtx } from '$lib/contexts'
	import { connected, chainId, signerAddress, loading } from 'svelte-wagmi';
	import { Tab, Tabs, Card } from 'svelte-ux';
	import { 
        CompoundsChart, 
        GoalsWidget,
        NftsChart,
        PurchasePriority,
        RewardsCollectionTarget,
        SummaryCard,
        TokensTable,
    } from '$lib/components';

	// export let data;
    let value: TokensData;
    const walletData = getWalletDataCtx();
    // const walletTotals = getWalletTotalsCtx();


	$: console.log('🚀 ~ $signerAddress:', $signerAddress);
	// $: console.log('🚀 ~ value:', value);
    $: console.log('$walletData:', $walletData)
    // $: console.log('$walletTotals:', $walletTotals)
	// $: console.log('🚀 ~ userWallets:', userWallets);
    $: $walletData && $walletData.length > 0 && !value ? value = $walletData[0].value : '';
</script>
{#if $connected && $signerAddress}
    {#if $walletData}
        <Tabs
            options={$walletData}
            placement="top"
            bind:value
            classes={{
                root: 'overflow-hidden',
                content: 'border px-4 py-5 rounded-b rounded-tr',
                tab: { root: 'rounded-t' }
            }}
        >
            <svelte:fragment slot="content" let:value>
                <div class="flex flex-col gap-5">
                    <SummaryCard walletTotals={value.totals} />
                    <RewardsCollectionTarget walletTotals={value.totals} />
                    <CompoundsChart walletTotals={value.totals} />
                    <GoalsWidget />
                    <div class="flex flex-col lg:flex-row w-full md:gap-5">
                        <div class="basis-1/5 flex justify-stretch">
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
    {:else}   
        <Card loading class="p-5 m-5 min-h-20" />
    {/if}
{/if}
