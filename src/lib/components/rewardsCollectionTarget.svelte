<script lang="ts">
    import currency from 'currency.js'
	import { roundUnits } from "$lib/utils";
	import { Badge, Card, Field } from "svelte-ux";
    import type { WalletTotals } from '$lib/types';
    import { defaultValues } from '$lib/data/defaultCompoundValues';
	import { getCompoundValuesCtx } from '$lib/contexts';

    export let targetData: WalletTotals;
    const compoundValues = getCompoundValuesCtx();

    function getStatusColor(time: number) {
        if (time <= 0) {
            return 'green-500';
        } else if (time > 0 && time <= 2) {
            return 'blue-500';
        } else if (time > 2 && time <= 5) {
            return 'yellow-500';
        }

        return 'red-500';
    }
  
    let breakdownData = {
        newNfts: 0,
        dailyIncrease: 0,
        govTaxes: 0,
        txTaxes: 0,
        personalReserve: 0,
        usableClaim: 0,
    }

    // Calculations
    function updateCompoundBreakdown(targetData: WalletTotals) {
        breakdownData.govTaxes = targetData.rewardsBalance * ($compoundValues.taxesReserved/100);
        breakdownData.txTaxes = targetData.rewardsBalance * ($compoundValues.txTaxes/100);
        breakdownData.personalReserve = targetData.rewardsBalance * ($compoundValues.personalReserve/100);
        breakdownData.usableClaim = targetData.rewardsBalance - (breakdownData.govTaxes + breakdownData.txTaxes + breakdownData.personalReserve);
        breakdownData.newNfts = Number(currency(breakdownData.usableClaim / $compoundValues.nftCost, {precision: 0}));
        breakdownData.dailyIncrease = breakdownData.newNfts * (targetData.dailyReturns / targetData.totalNfts) || 0;
    }

    let collectionTarget: number = 0;
    let countdown: number = 0;
    let statusColor: string;
    
    $: collectionTarget = targetData.dailyReturns * 30;
    $: countdown = Number(currency((collectionTarget - targetData.rewardsBalance) / targetData.dailyReturns, { precision: 1 })) || 0;
    $: statusColor = getStatusColor(countdown);
    $: targetData, updateCompoundBreakdown(targetData);
</script>

<div class="flex justify-around p-4 flex-row">
    <div>
        <h3 class="text-4xl text-center mb-2">Rewards Status</h3>
        <Card class="flex justify-center p-4">
            <div class="flex gap-10 p-4 justify-center flex-row">
                <div class="flex flex-col text-center gap-2">
                    <strong>Current Rewards</strong>
                    <span class={`text-4xl text-${statusColor}`}>
                        <strong>{currency(targetData.rewardsBalance).format()}</strong>
                    </span>
                    <!-- <Field label="Override" labelPlacement="inset"></Field> -->
                </div>
                <div class="flex flex-col text-center gap-">
                    <strong class="mb-3">Collection Target</strong>
                    <Badge value={countdown} dot class={`bg-${statusColor}`}>
                        <span class="text-3xl">${currency(collectionTarget)}</span>
                    </Badge>
                        <span class={`text-${statusColor}`}>{countdown} days</span>
                </div>
            </div>
        </Card>
    </div>

    <div>
        <h3 class="text-4xl text-center mb-2">Compound Breakdown</h3>
        <Card class="flex gap-4 p-4 justify-around align-middle flex-row">
            <div class="flex flex-col gap-2 justify-center">
                <div class="flex flex-col text-center">
                    <strong>New NFTs</strong>
                    <span class="text-3xl text-green-500">
                        <strong>{breakdownData.newNfts}</strong>
                    </span>
                </div>
                <div class="flex flex-col text-center">
                    <strong>Daily Increase</strong>
                    <span class="text-4xl text-green-500">
                        <strong>${currency(breakdownData.dailyIncrease)}</strong>
                    </span>
                </div>
            </div>
            <div class="flex flex-col border-secondary-content gap-1">
                <strong class="text-center">Compound Data</strong>
                <div class="grid grid-cols-2 justify-between"><span>Govt Taxes:</span> <span class="text-right">{currency(breakdownData.govTaxes).format()}</span></div>
                <div class="grid grid-cols-2 justify-between"><span>Tx Taxes:</span> <span class="text-right">{currency(breakdownData.txTaxes).format()}</span></div>
                <div class="grid grid-cols-2 justify-between"><span>Reserve:</span> <span class="text-right">{currency(breakdownData.personalReserve).format()}</span></div>
                <div class="grid grid-cols-2 justify-between"><span>Usable Claim:</span> <span class="text-right"><strong>{currency(breakdownData.usableClaim).format()}</strong></span></div>
            </div>
                    <!-- <div class="flex flex-col text-center">
                <strong>Wallet Balance</strong>
                <span class="text-3xl">${$walletTotals.walletBalance}</span>
            </div> -->
            <!-- <div class="flex flex-col text-center">
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
            </div> -->
        </Card>
    </div>
</div>