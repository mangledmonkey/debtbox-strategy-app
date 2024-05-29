<script lang="ts">
	import type { WalletTotals } from "$lib/types";
    import currency from "currency.js";
    import { Card } from "svelte-ux";

    interface Props {
        walletTotals: WalletTotals,
    }

    let { walletTotals }: Props = $props();

    // let stakedDebtBalance = $state(0);
    const stakedDebtBalance = $derived(walletTotals.stakedTokens * walletTotals.debtPrice);
</script>
<Card>
    <div class="flex flex-wrap flex-row gap-5 p-4 justify-evenly">
        <div class="flex flex-col justify-between text-center basis-20 xl:basis-auto">
            <span class="text-xs font-semibold">DEBT Price</span>
            <span class="text-md">{currency(walletTotals.debtPrice).format()}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">Daily Rewards</span>
            <span class="text-md font-bold">{currency(walletTotals.dailyReturns).format()}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">Rewards Balance</span>
            <span class="text-md font-bold">{currency(walletTotals.rewardsBalance).format()}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">Staked NFTs</span>
            <span class="text-md">{walletTotals.stakedNfts}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">Unstaked NFTs</span>
            <span class="text-md">{walletTotals.unstakedNfts}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">DEBT Staked</span>
            <span class="text-md">{walletTotals.stakedTokens}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">Staked DEBT Value</span>
            <span class="text-md">{currency(stakedDebtBalance).format()}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">Wallet Balance</span>
            <span class="text-md">{currency(walletTotals.walletBalance).format()}</span>
        </div>
        <div class="flex flex-col justify-between text-center basis-20 md:basis-30  xl:basis-auto">
            <span class="text-xs font-semibold">Total Value</span>
            <span class="text-md font-bold">{currency(walletTotals.rewardsBalance + walletTotals.walletBalance + stakedDebtBalance).format()}</span>
        </div>
    </div>
</Card>