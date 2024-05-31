<script lang="ts">
	import type { GoalData, GoalsData, StrategyValuesContext, WalletTotalsContext } from '$lib/types';
	import { db } from '$lib/db';
	import { getWalletTotalsCtx, getStrategyValuesCtx, getGoalsCtx } from '$lib/contexts';
	import currency from 'currency.js';
	import { Button, Card, Icon, TextField, Table } from 'svelte-ux';
	import LucideCirclePlus from '~icons/lucide/circle-plus?raw';
	import LucideCheck from '~icons/lucide/check?raw';
	import LucideOctagonX from '~icons/lucide/octagon-x?raw';
	import LucideEdit3 from '~icons/lucide/edit-2?raw';
	import { calculateGoals } from '$lib/utils';
	import consola from 'consola';
    import { goalColors } from '$lib/data/goalColors';

	const goals = getGoalsCtx();

	let addingGoal: boolean = $state(false);
	let status = $state('');

	let newGoal: number | undefined = $state();
	let newGoalName: string = $state('');

	const strategyValues: StrategyValuesContext = getStrategyValuesCtx();
	const walletTotals: WalletTotalsContext = getWalletTotalsCtx();
	console.log('🚀 ~ walletTotals:', $walletTotals);

	function addGoal() {
		consola.info('Adding a goal!:', addingGoal);
		addingGoal = true;
	}

	function cancelGoal() {
		consola.info('Cancelling the new goal!:', addingGoal);
		addingGoal = false;
		resetNewGoal();
	}

	async function saveGoal() {
		consola.info('Saving a goal!:', addingGoal);

		try {
			await db.goals.add({
				name: newGoalName,
				target: newGoal || 0
			});

			addingGoal = false;
		} catch (error) {
			status = `Failed to at the ${newGoalName} daily goal of ${newGoal}: ${error}`;
		}
		resetNewGoal();
	}

	function editGoals() {}

	function resetNewGoal() {
		newGoal = 0;
		newGoalName = '';
	}

	const goalsData: GoalsData = $derived(calculateGoals($goals, $walletTotals, $strategyValues));
	$inspect('🚀 ~ goalsData:', goalsData);
</script>

<section  id="goalsWidget" class="my-2 w-full">
    <h2 class="text-2xl">Daily Rewards Goals</h2>
	<Card class="overflow-hidden p-4">
		<p>{status}</p>
		<div class="goals-widget--goals-table w-full overflow-x-scroll p-2">
			{#if goalsData.length > 0}
				<table class="table-auto sm:w-full text-sm">
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
					<tbody class="bg-surface-300">
						{#each goalsData as goal, i}
							<tr class="border border-l-4 border-r-4 border-t-4">
								<th rowspan="2" scope="rowgroup" class={`px-2 text-center${goal.id ? ` text-${goalColors[i]}` : ''}`}>
									{goal.name}
									<!-- <Icon data={LucideEdit3} size="1em" /> -->
								</th>
								<th scope="row" class="px-2 text-center border-r-2">Goal</th>
								<td class="px-2 text-center font-bold text-green-500">
									{currency(goal.target, { precision: 0 }).format()}
									<!-- <Icon  size="1em" /> -->
								</td>
								<td class="px-2 text-center font-semibold text-green-700"
									>{currency(goal.weeklyReturns, { precision: 0 }).format()}</td
								>
								<td class="px-2 text-center font-semibold text-green-700"
									>{currency(goal.monthlyReturns, { precision: 0 }).format()}</td
								>
								<td class="px-2 text-center font-semibold text-green-700 border-r-2"
									>{currency(goal.yearlyReturns, { precision: 0 }).format()}</td
								>
								<td class="px-2 text-center">{goal.totalNfts}</td>
								<td class="px-2 text-center border-r-2">{currency(goal.totalCost).format()}</td>
								<td class="px-2 text-center">{goal.nftsRemaining}</td>
								<td class="px-2 text-center">{currency(goal.expectedCost).format()}</td>
							</tr>
							<tr class="border border-b-4 border-l-4 border-r-4">
								<th scope="row" class="px-2 text-center border-r-2">ROI</th>
								<td class="px-2 text-center">
                                    {currency((goal.target/goal.totalCost * 100), { precision : 2 })}%
                                </td>
								<td class="px-2 text-center">
                                    {currency((goal.weeklyReturns/goal.totalCost * 100), { precision : 2 })}%
                                </td>
								<td class="px-2 text-center">
                                    {currency((goal.monthlyReturns/goal.totalCost * 100), { precision : 2 })}%
                                </td>
								<td class="px-2 text-center border-r-2">
                                    {currency((goal.yearlyReturns/goal.totalCost * 100), { precision : 2 })}%
                                </td>
								<td class="px-2 text-center bg-surface-200"></td>
								<td class="px-2 text-center bg-surface-200"></td>
								<td class="px-2 text-center bg-surface-200"></td>
								<td class="px-2 text-center bg-surface-200"></td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>

		<div class="goals-widget--btn-row m-2 flex justify-end gap-2">
			{#if !addingGoal}
				<Button
					icon={LucideCirclePlus}
					color="primary"
					onclick={addGoal}
					hidden={addingGoal}>Add Goal</Button
				>
				<Button
					icon={LucideEdit3}
					color="secondary"
					onclick={editGoals}
					hidden={addingGoal}>Edit Goals</Button
				>
			{:else if addingGoal}
				<fieldset class="flex flex-col justify-between gap-5 sm:flex-row">
					<TextField
						label="Goal Name"
						value={newGoalName}
						type="text"
						on:change={(e) => {
							if (typeof e.detail.value === 'string') {
								newGoalName = e.detail.value;
							}
						}}
						max={42}
						autofocus
						clearable
						classes={{ root: 'w-full' }}
					/>
					<TextField
						label="Daily Rewards Goal"
						value={newGoal}
						type="integer"
						on:change={(e) => {
							if (typeof e.detail.value === 'number') {
								newGoal = e.detail.value;
							}
						}}
						max={7}
						clearable
						classes={{ root: 'w-full' }}
					>
						<div slot="prefix">
							<span class="font-xs text-gray-500">$&nbsp</span>
						</div>
					</TextField>
					<div class="min-w-400 flex flex-row gap-5">
						<div class="m-auto">
							<Button icon={LucideCheck} color="success" on:click={saveGoal}
								>Save</Button
							>
						</div>
						<div class="m-auto">
							<Button icon={LucideOctagonX} color="danger" on:click={cancelGoal}
								>Cancel</Button
							>
						</div>
					</div>
				</fieldset>
			{/if}
		</div>
	</Card>
</section>
