<script lang="ts">
	import type { 
        TokensChartData, 
        TokensChartOptions, 
        TokenData,
		StrategyValuesContext,
    } from '$lib/types';
    import { Tabs } from 'svelte-ux';
    import { 
        Axis,
        Bars,
        Chart,
        Highlight,
        Rule,
        Svg,
        Text,
        Tooltip,
        TooltipItem
    } from 'layerchart';
    import { scaleBand, scaleOrdinal } from 'd3-scale';
    import currency from 'currency.js';
	import { getStrategyValuesCtx } from '$lib/contexts';
    import { getTokensChartData } from '$lib/utils'
	import { extent, mean } from 'd3-array';

    interface Props {
        tokenData: TokenData[],
    }

    let { tokenData }: Props = $props();
    const strategyValues: StrategyValuesContext = getStrategyValuesCtx();

    const chartData: TokensChartOptions = $derived(getTokensChartData(tokenData, $strategyValues))
    let value: TokensChartData[] = $state([]); 

    $effect(() => {
        value = chartData[0].value
    })
</script>
<article id="compoundStrategyChart">
    <h2 class="text-2xl">NFTs Chart</h2>
    <Tabs
        options={chartData}
        placement="top"
        bind:value
        classes={{
            root: 'my-5 overflow-visible',
            content: 'border px-4 py-5 rounded-b rounded-tr',
            tab: { root: 'rounded-t' }
        }}
    >
        <svelte:fragment slot="content" let:value>

            <div class="h-[300px] w-full p4">
                <Chart
                    data={value}
                    x="token"
                    xScale={scaleBand().padding(0.4)}
                    y="values"
                    yDomain={extent(value.flatMap((d) => d.values))}
                    yNice={4}
                    r={(d: TokenData[]) => d.keys[1]}
                    rScale={scaleOrdinal()}
                    padding={{ left: 16, bottom: 24 }}
                    tooltip={{ mode: "band"}}
                    let:width
                    let:yScale
                >
                    {@const avg: number = mean(value, (d: TokenData) => d.dailyRewardsValue) || 0}
                    <Svg>
                        <Axis
                            placement="left" 
                            grid
                            rule
                        />
                        <Axis
                            placement="bottom"
                            rule
                        />
                        <Bars
                            radius={4}
                            strokeWidth={1}
                            class="fill-primary"
                        />
                        <Rule
                            y={avg}
                            class="stroke-2 stroke-secondary [stroke-dasharray:4] [stroke-linecap:round] "
                        />
                        <Text
                            x={width}
                            y={yScale(avg)}
                            dy={-4}
                            value={`Avg ${currency(avg).format()}`}
                            textAnchor="end"
                            verticalAnchor="end"
                            class="text-md fill-secondary stroke-surface-100 stroke-2"
                        />
                        <Highlight area />
                    </Svg>
                    <Tooltip header={data => data.token} let:data>
                        <TooltipItem
                            label="wallet count" 
                            value={
                                data.walletCount
                            }
                            classes={{ 
                                label: "font-bold",
                                value: "font-bold"
                            }}
                        />
                        <TooltipItem
                            label="daily rewards value" 
                            value={
                                currency(data.dailyRewardsValue)
                                .format()
                            }
                            classes={{ 
                                label: "font-bold",
                                value: "font-bold"
                            }}
                        />
                        <TooltipItem 
                            label="daily rewards rate" 
                            value={
                                currency(
                                    data.dailyRewardsRate,
                                    { precision: 4, symbol: ''}
                                ).format()
                            } 
                        />
                        <TooltipItem
                            label="daily roi"
                            value={`${
                                currency(
                                    data.dailyRoi * 100,
                                    { precision: 2, symbol: ''}
                                ).format()
                            }%`}
                        />
                        <TooltipItem
                            label="weekly rewards value" 
                            value={
                                currency(data.weeklyRewardsValue)
                                .format()
                            }
                        />
                        <TooltipItem
                            label="weekly roi"
                            value={`${
                                currency(
                                    data.weeklyRoi * 100,
                                    { precision: 2, symbol: ''}
                                ).format()
                            }%`}
                        />
                        <TooltipItem
                            label="monthly rewards value" 
                            value={
                                currency(data.monthlyRewardsValue)
                                .format()
                            }
                        />
                        <TooltipItem
                            label="monthly roi"
                            value={`${
                                currency(
                                    data.monthlyRoi * 100,
                                    { precision: 2, symbol: ''}
                                ).format()
                            }%`}
                        />
                        <TooltipItem
                            label="annualized rewards value" 
                            value={
                                currency(data.yearlyRewardsValue)
                                .format()
                            }
                        />
                        <TooltipItem
                            label="annualized roi"
                            value={`${
                                currency(
                                    data.annualizedRoi * 100,
                                    { precision: 2, symbol: ''}
                                ).format()
                            }%`}
                        />
                    </Tooltip>
                </Chart>
            </div>
        </svelte:fragment>
    </Tabs>
</article>