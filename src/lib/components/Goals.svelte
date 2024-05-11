<script lang="ts">
    import { useQuery, useMutation, useQueryClient } from '@sveltestack/svelte-query'
	import { Button, Card, Icon, Table } from "svelte-ux"; 
    import LucideCirclePlus from '~icons/lucide/circle-plus?raw';
    import LucideCheck from '~icons/lucide/check?raw';
    import LucideOctagonX from '~icons/lucide/octagon-x?raw';
    import LucideEdit3 from '~icons/lucide/edit-2?raw';

    let addingGoal: boolean = false;

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

</script>
<section class="goals-widget">
    <Card>
        <div class="goals-widget--goals-table">
            <table class="table-auto">
                <thead>
                <tr>
                    <th class="min-w-2">Goals</th>
                    <th class="min-w-2">Daily Returns</th>
                    <th class="min-w-2">Weekly Returns</th>
                    <th class="min-w-2">Monthly Returns</th>
                    <th class="min-w-2">Yearly Returns</th>
                    <th class="min-w-2">Total NFTs</th>
                    <th class="min-w-2">Total Cost</th>
                    <th class="min-w-2">Remaining</th>
                    <th class="min-w-2">Expected Cost</th>
                </tr>
                </thead>
                <tbody>
                        <tr>
                            <th rowspan="2" scope="rowgroup">Primary <Icon data={LucideEdit3} size="1em" /></th>
                            <th scope="row">Goal <Icon data={LucideEdit3} size="1em" /></th>
                            <td><Icon data={LucideEdit3} size="1em" /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <th scope="row">ROI</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                </tbody>
            </table>
        </div>

        <div class="goals-widget--btn-row flex justify-end gap-2">
        {#if !addingGoal}
            <Button icon={LucideCirclePlus} variant="outline" color="primary" on:click={addGoal} hidden={addingGoal}>Add Goal</Button>
        {:else if addingGoal}
            <Button icon={LucideOctagonX} variant="outline" color="danger" on:click={cancelGoal}>Cancel</Button>

            <Button icon={LucideCheck} variant="outline" color="success" on:click={saveGoal}>Save</Button>
        {/if}
        </div>
    </Card>
</section>