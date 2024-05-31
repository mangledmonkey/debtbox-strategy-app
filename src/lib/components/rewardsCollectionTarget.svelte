<script lang="ts">
    import type { WalletTotals } from '$lib/types';
    import currency from 'currency.js'
	import { getStrategyValuesCtx } from '$lib/contexts';
    import { getCountdown, getStatusColor, updateCompoundBreakdown } from '$lib/utils';
	import { Badge, Card } from "svelte-ux";

    interface Props {
        walletTotals: WalletTotals,
    }

    let { walletTotals }: Props = $props();
    const strategyValues = getStrategyValuesCtx();
    
    let countdown = $state(0)
    const collectionTarget: number = $derived(walletTotals.dailyReturns * 30);
    const statusColor: string = $derived(getStatusColor(countdown));
    const breakdownData = $derived(updateCompoundBreakdown(walletTotals, $strategyValues));

    $effect(() => {
        countdown = getCountdown(collectionTarget, walletTotals);
    })
</script>
<article id="collectionTargets">
    <h2 class="text-2xl">Collection Targets</h2>
    <div class="flex flex-wrap justify-evenly gap-5 flex-row">
        <div>
            <Card class="flex justify-start gap-4 p-4 w-full h-full">
                <h4 class="text-center mb-0">Rewards Status</h4>
                <div class="flex justify-center">
                    <div class="flex gap-2 justify-center flex-col">
                        <div class="flex flex-col text-center gap-1">
                            <span class="text-sm font-bold">Current Rewards</span>
                            <span class={`text-3xl text-${statusColor} font-bold`}>
                                {currency(walletTotals.rewardsBalance).format()}
                            </span>
                        </div>
                        <div class="flex flex-col text-center gap-1">
                            <span class="text-sm font-bold">Daily Rewards</span>
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
                <h4 class="text-center mb-0">Collection Status</h4>
                <div class="flex flex-col text-center justify-self-center">
                    <span class="text-sm font-bold mb-1">Collection Target</span>
                    <Badge value={countdown} dot class={`bg-${statusColor}`}>
                        <span class="text-3xl">{currency(collectionTarget).format()}</span>
                    </Badge>
                        <span class={`text-${statusColor}`}>{countdown} days</span>
                </div>
            </Card>
        </div>

        <div>
            <Card class="flex justify-normal gap-4 p-4 flex-col w-full h-full">
                <h4 class="text-center mb-0 self-gap-0">Compound Breakdown</h4>
                <div class="flex flex-wrap flex-row gap-2 justify-evenly">
                    <div class="flex flex-col order-1 text-center">
                        <span class="text-sm font-bold">New NFTs</span>
                        <span class="text-3xl text-green-500 font-bold">
                            {breakdownData.newNfts}
                        </span>
                    </div>
                    <div class="flex flex-col justify-between order-3 sm:order-2 text-center">
                        <span class="text-sm font-bold">Avg NFT Return</span>
                        <span class="text-2xl">
                            ${currency(walletTotals.avgDailyNftReturn)}
                        </span>
                    </div>
                    <div class="flex order-2 sm:order-3 flex-col text-center">
                        <span class="text-sm font-bold">Daily Increase</span>
                        <span class="text-3xl text-green-500 font-bold">
                            ${currency(breakdownData.dailyIncrease)}
                        </span>
                    </div>
                </div>
                <div class="flex flex-col border-secondary-content gap-1 justify-center">
                    <span class="text-sm font-bold">Compound Data</span>
                    <div class="flex flex-wrap flex-col sm:flex-row sm:justify-between justify-items-stretch gap-4 text-sm">
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