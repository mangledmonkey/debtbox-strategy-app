<script lang="ts">
	import type {
	    CompoundValue,
	    CompoundValues,
        StrategyValuesContext,
		WalletTotals
    } from "$lib/types";
    import currency from "currency.js";
    import { scaleTime } from 'd3-scale';
    import { format } from 'date-fns';
	import { getGoalsCtx, getStrategyValuesCtx } from "$lib/contexts";
	import { getCompoundValues, getGoalDates } from "$lib/utils";
    import { Chart, Svg, Axis, Spline, Highlight, Rule, Text, Tooltip, TooltipItem } from 'layerchart';
    import { Collapse, formatDate, Paginate, Pagination, PeriodType, Table } from "svelte-ux";
    import { goalColors } from "$lib/data/goalColors";

    interface Props {
        walletTotals: WalletTotals,
    }
    
    // export let tokenData: TokenData[];
    let { walletTotals }: Props = $props();
    const strategyValues: StrategyValuesContext = getStrategyValuesCtx();
    // console.log('🚀 ~ strategyValues:', $strategyValues)

    const goals = getGoalsCtx();
    
    const compoundValues: CompoundValues|undefined = $derived(getCompoundValues(walletTotals, $strategyValues));
    const goalDates = $derived(getGoalDates($goals, compoundValues));

    // $inspect('🚀 ~ compoundValues:', compoundValues)   
</script>

<article id="compoundStrategyChart">
    <h2 class="text-2xl">Compounds Chart</h2>
    <div class="h-[300px] p-4 border rounded">
        <Chart
            data={compoundValues}
            x="date"
            xScale={scaleTime()}
            y="dailyRewardsValue"
            yDomain={[0, null]}
            yNice
            padding={{ left: 16, bottom: 24 }}
            tooltip={{ mode: "bisect-x" }}
        >
            <Svg>
                <Axis
                    placement="left"
                    format={(c: number) => currency(c, { precision: 0 }).format()}
                    grid
                    rule
                    labelProps={{
                        class: "fill-success font-bold text-xs",
                    }}
                />
                <Axis
                    placement="bottom"
                    format={(d: Date) => format(d,  "MMM `yy" )}
                    grid
                    rule
                    labelProps={{
                        rotate: 315,
                        textAnchor: "end",
                        class: "font-semibold",
                      }}              
                />
                {#if goalDates}
                    {#each goalDates as goal, i}
                        <Rule
                            x={goal.date}
                            class={`stroke-2 [stroke-dasharray:4] [stroke-linecap:round] stroke-${goalColors[i]}`}
                        />
                    {/each}
                {/if}
                <Spline yScale="dailyRewardsValue" class="stroke-2 stroke-primary" />
                <Highlight points lines />
            </Svg>
            <Tooltip header={(data: CompoundValue) => format(data.date, "MMMM do, yyyy")} let:data>
                <TooltipItem 
                    label="daily rewards" 
                    value={currency(data.dailyRewardsValue).format()} 
                    classes={{ 
                        label: "font-bold",
                        value: "font-bold"
                    }}
                />
                <TooltipItem label="daily ROI" value={`${parseFloat((data.roiDaily * 100).toString()).toFixed(2)}%`} />
                <TooltipItem label="weekly rewards" value={currency(data.weeklyRewardsValue).format()} />
                <TooltipItem label="weekly ROI" value={`${parseFloat((data.roiWeekly * 100).toString()).toFixed(2)}%`} />
                <TooltipItem label="monthly rewards" value={currency(data.monthlyRewardsValue).format()} />
                <TooltipItem label="monthly ROI" value={`${parseFloat((data.roiMonthly * 100).toString()).toFixed(2)}%`} />
                <TooltipItem label="investment" value={currency(data.totalCost).format()} />
                <TooltipItem label="annualized rewards" value={currency(data.annualizedRewardsValue).format()} />
                <TooltipItem label="annualized ROI" value={`${parseFloat((data.roiAnnualized * 100).toString()).toFixed(2)}%`} />
            </Tooltip>
        </Chart>
    </div>
    <Collapse
        class="bg-surface-100 elevation-1 border-t first:border-t-0 first:rounded-t last:rounded-b p-2"
        classes={{
            trigger: "bg-surface-200",
        }}
    >
        <div slot="trigger" class="flex-1 px-3 py-3">Compound Strategy Chart Data</div>
        <div class="px-3 pb-3 bg-surface-200 border-t overflow-x-scroll">
            <Paginate data={compoundValues} perPage={12} let:pageData let:pagination>
                <Table
                    class="overflow-x-auto"
                    classes={{
                        table: 'table-auto mt-2 overflow-x-auto border-solid border-2',
                        th: 'min-w-4 text-center align-bottom p-2 border-solid border-b-2',
                        td: 'p-2'
                    }}
                    styles={{
                        th: "text-align: center; !important",
                    }}
                    data={pageData}
                    columns={[
                        {
                            header: "Months",
                            name: "id",
                            align: "center",
                            format: (id: number): string => {
                                return (id + 1).toString()
                            },
                        },
                        {
                            header: "Date",
                            name: "date",
                            align: "left",
                            classes: {
                                th: "w-20"
                            },
                            style: {
                                th: "width: 100px;"
                            },
                            format: (d: Date) => {
                                return formatDate(d, PeriodType.MonthYear, { variant: "custom" });
                            },
                        },
                        {
                            header: "Daily Rewards Value",
                            name: "dailyRewardsValue",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Weekly Rewards Value",
                            name: "weeklyRewardsValue",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Monthly Rewards Value",
                            name: "monthlyRewardsValue",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Annualized Rewards Value",
                            name: "annualizedRewardsValue",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Gov Taxes",
                            name: "govTaxes",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Gov Taxes Reserved",
                            name: "taxesReserved",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Tx Taxes",
                            name: "txTaxes",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Personal Reserve",
                            name: "personalReserve",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Personal Total",
                            name: "personalTotal",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Usable Claim",
                            name: "usableClaim",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Wallet Balance",
                            name: "walletBalance",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "New Nfts",
                            name: "nftsNew",
                            align: "right",
                            format: "integer",
                        },
                        {
                            header: "Total NFTs",
                            name: "nftsEnd",
                            align: "right",
                            format: "integer",
                        },
                        {
                            header: "NFT Tx Fees",
                            name: "txFees",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Staked NFTs Value",
                            name: "stakedNftsValue",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Total Investment",
                            name: "totalCost",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Wallet End Value",
                            name: "walletEndValue",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Daily Rewards Increase",
                            name: "dailyRewardsIncrease",
                            align: "right",
                            format: "currency",
                        },
                        {
                            header: "Daily Increase Percent",
                            name: "dailyPercentIncrease",
                            align: "right",
                            format: "percent",
                        },
                        {
                            header: "ROI Daily",
                            name: "roiDaily",
                            align: "right",
                            format: "percent",
                        },
                        {
                            header: "ROI Weekly",
                            name: "roiWeekly",
                            align: "right",
                            format: "percent",
                        },
                        {
                            header: "ROI Monthly",
                            name: "roiMonthly",
                            align: "right",
                            format: "percent",
                        },
                        {
                            header: "ROI Annualized",
                            name: "roiAnnualized",
                            align: "right",
                            format: "percent",
                        },
                        {
                            header: "Yearly Rewards Earned",
                            name: "yearlyRewardsEarned",
                            align: "right",
                            format: "currency",
                        },
                    ]}
                />
                    <Pagination 
                        {pagination}
                        perPageOptions={[6,12,18,24,36]}
                        show={['perPage', 'pagination', 'prevPage', 'nextPage']}
                        classes={{ root: 'border-t py-1 mt-2', perPage: 'flex-1 text-right', pagination: 'px-8' }}>
                    </Pagination>
            </Paginate>
        </div>
    </Collapse>
</article>