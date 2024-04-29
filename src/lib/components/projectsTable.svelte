<script lang="ts">
    import type { Address, Chain } from 'viem';
    import type { 
        DebtBoxProject, 
        DebtBoxToken, 
        ProjectsTableData 
    } from '$lib/types';
    import { getProjectsTableData } from '$lib/helpers'
    import { Table, Card } from 'svelte-ux';

    // export let projects: DebtBoxProject[]|undefined;
    // export let tokens: DebtBoxToken[]|undefined;
    // export let signerAddress: Address|string|null;
    // export let chainId: number|null|undefined;

    export let tokenData: ProjectsTableData[] | null;
    // let projectsTableDataLoaded = false;

    // async function populateProjectsTable(projects: DebtBoxProject[], tokens: DebtBoxToken[], signerAddress: Address|string|null, chainId: number|null|undefined) {
    //     if (projects && tokens && signerAddress) {
    //         projectsTableData = await getProjectsTableData(projects, tokens, signerAddress, chainId);
    //         projectsTableDataLoaded = true;
    //     }
    // }

    // $: projects && tokens ? populateProjectsTable(projects, tokens, signerAddress, chainId) : '';
    // $: tokenData
    // $: projectsTableDataLoaded
</script>

<Table
    class="table-auto border-spacing-5"
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
            name: 'Rewards Rate',
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
                    ${rowData.price}
                </td>
                <td class="project-row--in-wallet text-right">
                    {rowData.inWallet.toLocaleString()}
                </td>
                <td class="project-row--wallet-value text-right">
                    ${rowData.walletValue.toLocaleString()}
                </td>
                <td class="project-row--rewards-rate text-right">
                    {rowData.dailyWalletRewardsRate.toLocaleString()}
                </td>
                <td class="project-row--rewards text-right">
                    {rowData.rewards.toLocaleString()}
                </td>
                <td class="project-row--rewards-value text-right">
                    ${rowData.rewardsValue.toLocaleString()}
                </td>
            </tr>
        {/each}
    </tbody>
</Table>