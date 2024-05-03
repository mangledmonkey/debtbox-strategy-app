<script lang="ts">
    import currency from 'currency.js';
    import type { Address, Chain } from 'viem';
    import type { 
        DebtBoxProject, 
        DebtBoxToken, 
        TokenData 
    } from '$lib/types';
    import { getTokensData } from '$lib/helpers'
    import { Table, Card } from 'svelte-ux';

    export let tokenData: TokenData[];
</script>

<Table
    class="mt-5 table-auto border-spacing-5x"
    data={tokenData}
    columns={[
        {
            name: 'Project',
            align: 'left'
        },
        {
            name: 'Price',
            align: 'center'
        },
        {
            name: 'In Wallet',
            align: 'right'
        },
        {
            name: 'Wallet Value',
            align: 'right'
        },
        {
            name: 'Daily Rewards Rate',
            align: 'right'
        },
        {
            name: 'Rewards',
            align: 'right'
        },
        {
            name: 'Rewards Value',
            align: 'right'
        },

    ]}>
    <tbody slot="data" let:columns let:data let:getCellValue>
        {#each data ?? [] as rowData, rowIndex}
            <tr class="tabular-nums">
                <td class="flex gap-2">
                    <div class={`flex-initial w-7 h-7 bg-contain bg-no-repeat bg-center`} style={`background-image: url(${rowData.icon})`}></div>
                    <span class="flex-initial self-center w-auto text-strong align-">
                        <strong>{rowData.name}</strong>
                    </span>
                </td>
                <td class="project-row--price text-right">
                    ${currency(rowData.price, {precision: 8})}
                </td>
                <td class="project-row--in-wallet text-right">
                    {rowData.inWallet}
                </td>
                <td class="project-row--wallet-value text-right">
                    ${currency(rowData.walletValue)}
                </td>
                <td class="project-row--rewards-rate text-right">
                    {rowData.dailyWalletRewardsRate}
                </td>
                <td class="project-row--rewards text-right">
                    {rowData.rewards}
                </td>
                <td class="project-row--rewards-value text-right">
                    ${currency(rowData.rewardsValue)}
                </td>
            </tr>
        {/each}
    </tbody>
</Table>