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
    console.log('🚀 ~ tokenData:', tokenData)

    function sumRewardsValues(tokens: TokenData[], property: keyof TokenData) {
        const values = tokens.map(token => {
            return token[property]
        })
        
        return values.reduce((total, val) => total + val)
    }
    
    function getRewardsTotals(tokens: TokenData[]) {
        let totals = {
            inWallet: sumRewardsValues(tokens, 'inWallet'),
            walletValue: sumRewardsValues(tokens, 'walletValue'),
            rewardsValue: sumRewardsValues(tokens, 'rewardsValue'),
            stakedNfts: sumRewardsValues(tokens, 'stakedNfts'),
            dailyRewardsValue: sumRewardsValues(tokens, 'dailyRewardsValue'),
            dailyWalletRewardsValue: sumRewardsValues(tokens, 'dailyWalletRewardsValue'),
            weeklyWalletRewardsValue: sumRewardsValues(tokens, 'weeklyWalletRewardsValue'),
            monthlyWalletRewardsValue: sumRewardsValues(tokens, 'monthlyWalletRewardsValue'),
            yearlyWalletRewardsValue: sumRewardsValues(tokens, 'yearlyWalletRewardsValue'),
        }

        return totals
    }

    let rewardsTotals
    const tableClasses = {
        table: 'mt-5 table-auto overflow-x-auto border-solid border-2',
        th: 'min-w-24 text-center align-bottom p-2 border-solid border-b-2',
    }
    $: rewardsTotals = getRewardsTotals(tokenData)
</script>

<article class="mt-5" id="projectTokensTable">
    <h3>Project Tokens Table</h3>
    <Table
        class="overflow-x-auto"
        classes={tableClasses}
        data={tokenData}
        columns={[
            {
                name: 'Project',
                align: 'left',
                classes: {
                    th: 'min-w-64 text-center'
                }
            },
            {
                name: 'Price',
                align: 'center',
                classes: {
                    th: 'min-w-32'
                }
            },
            {
                name: 'Wallet Balance',
                align: 'center',
            },
            {
                name: 'Wallet Value',
                align: 'center',
                classes: {
                    th: 'border-r-2'
                }
            },
            {
                name: 'Rewards Balance',
                align: 'center',
            },
            {
                name: 'Rewards Value',
                align: 'center',
                classes: {
                    th:'border-r-2'
                }
            },
            {
                name: 'NFT Rewards Rate',
                align: 'center',
            },
            {
                name: 'NFTs Staked',
                align: 'center',
            },
            {
                name: 'Daily Rewards Rate',
                align: 'center',
            },
            {
                name: 'Daily Rewards Value',
                align: 'center',
                classes: {
                    th:'border-r-2'
                }
            },
            {
                name: 'Weekly Rewards Rate',
                align: 'center',
            },
            {
                name: 'Weekly Rewards Value',
                align: 'center',
                classes: {
                    th:'border-r-2'
                }
            },
            {
                name: 'Monthly Rewards Rate',
                align: 'center',
            },
            {
                name: 'Monthly Rewards Value',
                align: 'center',
                classes: {
                    th:'border-r-2'
                }
            },
            {
                name: 'Yearly Rewards Rate',
                align: 'center',
            },
            {
                name: 'Yearly Rewards Value',
                align: 'center',
                classes: {
                    th:'border-r-2'
                }
            },

        ]}>
        <tbody slot="data" let:columns let:data let:getCellValue>
            {#each data ?? [] as rowData, rowIndex}
                <tr class="tabular-nums">
                    <td class="flex gap-2 px-2">
                        <div class={`flex-initial w-7 h-7 bg-contain bg-no-repeat bg-center`} style={`background-image: url(${rowData.icon})`}></div>
                        <span class="flex-initial self-center w-auto text-strong align-">
                            <strong>{rowData.name}</strong>
                        </span>
                    </td>
                    <td class="project-row--price px-2 text-right">
                        {currency(rowData.price, { precision: 8 }).format()}
                    </td>
                    <td class="project-row--in-wallet px-2 text-right">
                        {currency(rowData.inWallet, {precision: 4, symbol: ''}).format()}
                    </td>
                    <td class="project-row--wallet-value px-2 text-right border-solid border-r-2">
                        {currency(rowData.walletValue).format()}
                    </td>
                    <td class="project-row--rewards-balance px-2 text-right">
                        {currency(rowData.rewards, { precision: 0, symbol: '' }).format()}
                    </td>
                    <td class="project-row--rewards-value px-2 text-right border-solid border-r-2">
                        <strong>{currency(rowData.rewardsValue).format()}</strong>
                    </td>
                    <td class="project-row--nft-rewards-rate px-2 text-right">
                        {currency(rowData.dailyRewardsRate, { precision: 4, symbol: '' }).format()}
                    </td>
                    <td class="project-row--nfts-staked px-2 text-right">
                        {currency(rowData.stakedNfts, { precision: 0, symbol: '' }).format()}
                    </td>
                    <td class="project-row--daily-rewards-rate px-2 text-right">
                        {currency(rowData.dailyWalletRewardsRate, { precision: 4, symbol: '' }).format()}
                    </td>
                    <td class="project-row--daily-wallet-rewards-value px-2 text-right border-r-2">
                        <strong>{currency(rowData.dailyWalletRewardsValue).format()}</strong>
                    </td>
                    <td class="project-row--weekly-rewards-rate px-2 text-right">
                        {currency(rowData.weeklyWalletRewardsRate, { precision: 0, symbol: '' }).format()}
                    </td>
                    <td class="project-row--weekly-wallet-rewards-value px-2 text-right border-r-2">
                        <strong>{currency(rowData.weeklyWalletRewardsValue).format()}</strong>
                    </td>
                    <td class="project-row--monthly-rewards-rate px-2 text-right">
                        {currency(rowData.monthlyWalletRewardsRate, { precision: 0, symbol: '' }).format()}
                    </td>
                    <td class="project-row--monthly-wallet-rewards-value px-2 text-right border-r-2">
                        <strong>{currency(rowData.monthlyWalletRewardsValue).format()}</strong>
                    </td>
                    <td class="project-row--yearly-rewards-rate px-2 text-right">
                        {currency(rowData.yearlyWalletRewardsRate, { precision: 0, symbol: '' }).format()}
                    </td>
                    <td class="project-row--yearly-wallet-rewards-value px-2 text-right border-r-2">
                        <strong>{currency(rowData.yearlyWalletRewardsValue).format()}</strong>
                    </td>
                </tr>
            {/each}
            <tr class="tabular-nums border-t-2">
                <td class="flex gap-2 px-4">
                    <span class="flex-initial self-center w-auto text-strong align-">
                        <strong>TOTALS:</strong>
                    </span>
                </td>
                <td class="project-row--price px-2 text-right">
                </td>
                <td class="project-row--in-wallet px-2 text-right">
                </td>
                <td class="project-row--wallet-value px-2 text-right border-solid border-r-2">
                    {currency(rewardsTotals.walletValue).format()}
                </td>
                <td class="project-row--rewards-balance px-2 text-right">
                </td>
                <td class="project-row--rewards-value px-2 text-right border-solid border-r-2">
                    <strong>{currency(rewardsTotals.rewardsValue).format()}</strong>
                </td>
                <td class="project-row--nft-rewards-rate px-2 text-right">
                </td>
                <td class="project-row--nfts-staked px-2 text-right">
                    {currency(rewardsTotals.stakedNfts, { precision: 0, symbol: '' }).format()}
                </td>
                <td class="project-row--daily-rewards-rate px-2 text-right">
                </td>
                <td class="project-row--daily-wallet-rewards-value px-2 text-right border-r-2">
                    <strong>{currency(rewardsTotals.dailyWalletRewardsValue).format()}</strong>
                </td>
                <td class="project-row--weekly-rewards-rate px-2 text-right">
                </td>
                <td class="project-row--weekly-wallet-rewards-value px-2 text-right border-r-2">
                    <strong>{currency(rewardsTotals.weeklyWalletRewardsValue).format()}</strong>
                </td>
                <td class="project-row--monthly-rewards-rate px-2 text-right">
                </td>
                <td class="project-row--monthly-wallet-rewards-value px-2 text-right border-r-2">
                    <strong>{currency(rewardsTotals.monthlyWalletRewardsValue).format()}</strong>
                </td>
                <td class="project-row--yearly-rewards-rate px-2 text-right">
                </td>
                <td class="project-row--yearly-wallet-rewards-value px-2 text-right border-r-2">
                    <strong>{currency(rewardsTotals.yearlyWalletRewardsValue).format()}</strong>
                </td>
            </tr>
        </tbody>
    </Table>
</article>