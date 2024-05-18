<script lang="ts">
    import type { GoalData, StrategyValuesContext, WalletTotalsContext } from '$lib/types';
    import type { Goals } from '$lib/server/db/schema/goals'
    import { useQuery, useMutation, useQueryClient } from '@sveltestack/svelte-query'
    import { getWalletTotalsCtx, getStrategyValuesCtx } from '$lib/contexts';
    import currency from 'currency.js';
	import { Button, Card, Icon, Table } from "svelte-ux"; 
    import LucideCirclePlus from '~icons/lucide/circle-plus?raw';
    import LucideCheck from '~icons/lucide/check?raw';
    import LucideOctagonX from '~icons/lucide/octagon-x?raw';
    import LucideEdit3 from '~icons/lucide/edit-2?raw';
    import { calculateGoals } from '$lib/utils';

    let addingGoal: boolean = false;

    const strategyValues: StrategyValuesContext = getStrategyValuesCtx();
    const walletTotals: WalletTotalsContext = getWalletTotalsCtx();
    console.log('🚀 ~ walletTotals:', $walletTotals)

    let goals: Goals = [{
        id: 0,
        order: 0,
        address: '0x',
        target: 10,
        name: 'primary'
    }]

    function addGoal() {
        addingGoal = true;
        console.log('Adding a goal!:', addingGoal)
    }

    function cancelGoal() {
        addingGoal = false;
        console.log('Cancelling the new goal!:', addingGoal) 
    }

    function saveGoal() {
        addingGoal = false;
        console.log('Saving a goal!:', addingGoal) 
    }

    let goalsData: GoalData[] = []
    $: if ($walletTotals && $strategyValues) goalsData = calculateGoals(goals, $walletTotals, $strategyValues)
    $: console.log('🚀 ~ goalsData:', goalsData)
</script>
<section class="goals-widget my-2">
    <Card class="p-2 overflow-hidden">
        <div class="goals-widget--goals-table p-2 overflow-x-scroll w-full">
            {#if goalsData.length > 0}
                <table class="table-auto sm:w-full">
                    <thead>
                    <tr>
                        <th class="min-w-4">Name</th>
                        <th class="min-w-4">Heading</th>
                        <th class="min-w-4">Daily Returns</th>
                        <th class="min-w-4">Weekly Returns</th>
                        <th class="min-w-4">Monthly Returns</th>
                        <th class="min-w-4">Yearly Returns</th>
                        <th class="min-w-4">Total NFTs</th>
                        <th class="min-w-4">Total Cost</th>
                        <th class="min-w-4">NFTs Remaining</th>
                        <th class="min-w-4">Expected Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                        {#each goalsData as goal}
                            <tr class="border border-t-4 border-l-4 border-r-4">
                                <th rowspan="2" scope="rowgroup"  class="text-center px-2">{goal.name} <Icon data={LucideEdit3} size="1em" /></th>
                                <th scope="row" class="text-center px-2">Goal</th>
                                <td class="text-center px-2">{currency(goal.target, {precision: 0}).format()} <Icon data={LucideEdit3} size="1em" /></td>
                                <td class="text-center px-2">{currency(goal.weeklyReturns, {precision: 0}).format()}</td>
                                <td class="text-center px-2">{currency(goal.monthlyReturns, {precision: 0}).format()}</td>
                                <td class="text-center px-2">{currency(goal.yearlyReturns, {precision: 0}).format()}</td>
                                <td class="text-center px-2">{goal.totalNfts}</td>
                                <td class="text-center px-2">{currency(goal.totalCost).format()}</td>
                                <td class="text-center px-2">{goal.nftsRemaining}</td>
                                <td class="text-center px-2">{currency(goal.expectedCost).format()}</td>
                            </tr>
                            <tr class="border border-b-4 border-l-4 border-r-4">
                                <th scope="row" class="text-center px-2">ROI</th>
                                <td class="text-center px-2"></td>
                                <td class="text-center px-2"></td>
                                <td class="text-center px-2"></td>
                                <td class="text-center px-2"></td>
                                <td class="text-center px-2"></td>
                                <td class="text-center px-2"></td>
                                <td class="text-center px-2"></td>
                                <td class="text-center px-2"></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </div>

        <div class="goals-widget--btn-row flex justify-end gap-2 m-2">
        {#if !addingGoal}
            <Button icon={LucideCirclePlus} variant="outline" color="primary" on:click={addGoal} hidden={addingGoal}>Add Goal</Button>
        {:else if addingGoal}
            <Button icon={LucideOctagonX} variant="outline" color="danger" on:click={cancelGoal}>Cancel</Button>

            <Button icon={LucideCheck} variant="outline" color="success" on:click={saveGoal}>Save</Button>
        {/if}
        </div>
    </Card>
</section>