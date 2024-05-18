<script lang="ts">
    import currency from 'currency.js'
	import { Badge, Card, Field } from "svelte-ux";
    import type { WalletTotals } from '$lib/types';
	import { getStrategyValuesCtx } from '$lib/contexts';

    export let walletTotals: WalletTotals;
    const strategyValues = getStrategyValuesCtx();

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
    function updateCompoundBreakdown(walletTotals: WalletTotals) {
        breakdownData.govTaxes = walletTotals.rewardsBalance * ($strategyValues.govTaxes/100);
        breakdownData.txTaxes = walletTotals.rewardsBalance * ($strategyValues.txTaxes/100);
        breakdownData.personalReserve = walletTotals.rewardsBalance * ($strategyValues.personalReserve/100);
        breakdownData.usableClaim = walletTotals.rewardsBalance - (breakdownData.govTaxes + breakdownData.txTaxes + breakdownData.personalReserve);
        breakdownData.newNfts = Math.floor(breakdownData.usableClaim / $strategyValues.nftCost);
        breakdownData.dailyIncrease = breakdownData.newNfts * walletTotals.avgDailyNftReturn || 0;
    }

    let collectionTarget: number = 0;
    let countdown: number = 0;
    let statusColor: string;
    
    $: collectionTarget = walletTotals.dailyReturns * 30;
    $: countdown = Number(currency((collectionTarget - walletTotals.rewardsBalance) / walletTotals.dailyReturns, { precision: 1 })) || 0;
    $: statusColor = getStatusColor(countdown);
    $: walletTotals, updateCompoundBreakdown(walletTotals);
</script>
<article id="collectionTargets">
    <h3>Collection Targets</h3>
    <div class="flex flex-wrap justify-evenly gap-5 p-4 flex-row">
        <div>
            <Card class="flex justify-start gap-4 p-4 w-full h-full">
                <h4 class="text-2xl text-center mb-2">Rewards Status</h4>
                <div class="flex justify-center">
                    <div class="flex gap-2 justify-center flex-col">
                        <div class="flex flex-col text-center gap-1">
                            <strong>Current Rewards</strong>
                            <span class={`text-4xl text-${statusColor} font-bold`}>
                                {currency(walletTotals.rewardsBalance).format()}
                            </span>
                        </div>
                        <div class="flex flex-col text-center gap-1">
                            <strong>Daily Rewards</strong>
                            <span class={`text-2xl text-${statusColor} font-bold`}>
                                {currency(walletTotals.dailyReturns).format()}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <div>
            <Card class="flex flex-col justify-normal gap-4 p-4 w-full h-full">
                <h4 class="text-2xl text-center mb-2">Collection Status</h4>
                <div class="flex flex-col text-center justify-self-center">
                    <strong class="mb-1">Collection Target</strong>
                    <Badge value={countdown} dot class={`bg-${statusColor}`}>
                        <span class="text-4xl">{currency(collectionTarget).format()}</span>
                    </Badge>
                        <span class={`text-${statusColor}`}>{countdown} days</span>
                </div>
            </Card>
        </div>

        <div>
            <Card class="flex justify-normal gap-4 p-4 flex-col w-full h-full">
                <h4 class="text-2xl text-center mb-2 self-gap-0">Compound Breakdown</h4>
                <div class="flex flex-wrap flex-row gap-2 justify-evenly">
                    <div class="flex flex-col order-1 text-center">
                        <strong>New NFTs</strong>
                        <span class="text-3xl text-green-500 font-bold">
                            {breakdownData.newNfts}
                        </span>
                    </div>
                    <div class="flex flex-col justify-between order-3 sm:order-2 text-center">
                        <strong>Avg NFT Return</strong>
                        <span class="text-2xl">
                            ${currency(walletTotals.avgDailyNftReturn)}
                        </span>
                    </div>
                    <div class="flex order-2 sm:order-3 flex-col text-center">
                        <strong>Daily Increase</strong>
                        <span class="text-3xl text-green-500 font-bold">
                            ${currency(breakdownData.dailyIncrease)}
                        </span>
                    </div>
                </div>
                <div class="flex flex-col border-secondary-content gap-1 justify-center">
                    <strong>Compound Data</strong>
                    <div class="flex flex-wrap flex-col sm:flex-row sm:justify-between justify-items-stretch gap-4">
                        <div>
                            <div class="grid grid-cols-2 justify-between">
                                <span>Govt Taxes:</span>
                                <span class="text-right">{currency(breakdownData.govTaxes).format()}
                                </span>
                            </div>
                            <div class="grid grid-cols-2 justify-between">
                                <span>Tx Taxes:</span>
                                <span class="text-right">
                                    {currency(breakdownData.txTaxes).format()}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class="grid grid-cols-2 justify-between">
                                <span>Reserve:</span>
                                <span class="text-right">
                                    {currency(breakdownData.personalReserve).format()}
                                </span>
                            </div>
                            <div class="grid grid-cols-2 justify-between">
                                <span>Usable Claim:</span>
                                <span class="text-right font-bold">
                                    {currency(breakdownData.usableClaim).format()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</article>