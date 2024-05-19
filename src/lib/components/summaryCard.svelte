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
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>DEBT Price</strong>
            <span class="text-2xl">{currency(walletTotals.debtPrice).format()}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>Daily Rewards</strong>
            <span class="text-2xl">{currency(walletTotals.dailyReturns).format()}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>Staked NFTs</strong>
            <span class="text-2xl">{walletTotals.stakedNfts}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>Unstaked NFTs</strong>
            <span class="text-2xl">{walletTotals.unstakedNfts}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>Rewards Balance</strong>
            <span class="text-2xl">{currency(walletTotals.rewardsBalance).format()}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>DEBT Staked</strong>
            <span class="text-2xl">{walletTotals.stakedTokens}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>Staked DEBT Value</strong>
            <span class="text-2xl">{currency(stakedDebtBalance).format()}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>Wallet Balance</strong>
            <span class="text-2xl">{currency(walletTotals.walletBalance).format()}</span>
        </div>
        <div class="flex flex-col text-center basis-2/5 sm:basis-40 lg:basis-52 xl:basis-auto">
            <strong>Total Value</strong>
            <span class="text-2xl">{currency(walletTotals.rewardsBalance + walletTotals.walletBalance + stakedDebtBalance).format()}</span>
        </div>
    </div>
</Card>