<script lang="ts">
	import type { WalletTotals } from "$lib/types";
    import currency from "currency.js";
    import { Card } from "svelte-ux";

export let walletTotals: WalletTotals;

</script>
<Card class="mt-5">
    <div class="flex gap-2 p-4 justify-between">
        <div class="flex flex-col text-center">
            <strong>Daily Rewards</strong>
            <span class="text-2xl">${currency(walletTotals.dailyReturns)}</span>
        </div>
        <div class="flex flex-col text-center">
            <strong>Rewards Balance</strong>
            <span class="text-2xl">${currency(walletTotals.rewardsBalance)}</span>
        </div>
        <div class="flex flex-col text-center">
            <strong>Wallet Balance</strong>
            <span class="text-2xl">${currency(walletTotals.walletBalance)}</span>
        </div>
        <div class="flex flex-col text-center">
            <strong>Total Value</strong>
            <span class="text-2xl">${currency(walletTotals.rewardsBalance + walletTotals.walletBalance)}</span>
        </div>
        <div class="flex flex-col text-center">
            <strong>Staked NFTs</strong>
            <span class="text-2xl">{walletTotals.stakedNfts}</span>
        </div>
        <div class="flex flex-col text-center">
            <strong>Unstaked NFTs</strong>
            <span class="text-2xl">{walletTotals.unstakedNfts}</span>
        </div>
    </div>
</Card>