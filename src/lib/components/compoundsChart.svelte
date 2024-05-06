<script lang="ts">
	import type {
        StrategyValuesContext,
		WalletTotals
    } from "$lib/types";
	import { getStrategyValuesCtx } from "$lib/contexts";
	import { getCompoundValues } from "$lib/utils";
    import { scaleTime } from 'd3-scale';
    import { format } from 'date-fns';
    import { Chart, Svg, Axis, Spline, Highlight, Points, Tooltip, TooltipItem } from 'layerchart';
    import { formatDate, PeriodType } from "svelte-ux";
    import currency from "currency.js";
    
    // export let tokenData: TokenData[];
    export let walletTotals: WalletTotals;
    const strategyValues: StrategyValuesContext = getStrategyValuesCtx();
    console.log('🚀 ~ compoundValues:', $strategyValues)

    let compoundValues;

    $: compoundValues = getCompoundValues(walletTotals, $strategyValues);
    $: console.log('🚀 ~ strategyValues:', strategyValues)
    
</script>

<article id="compoundStrategyChart" class="mt-5">
    <h3>Compound Strategy Chart</h3>
<div class="h-[300px] p-4 border rounded mt-4">
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
            <Axis placement="left" grid rule />
            <Axis
            placement="bottom"
            format={(d) => formatDate(d, PeriodType.MonthYear, { variant: "short" })}
            rule
            />
            <Spline class="stroke-2 stroke-primary" />
            <Highlight points lines />
        </Svg>
        <Tooltip header={(data) => format(data.date, "eee, MMMM do")} let:data>
            <TooltipItem label="daily rewards" value={currency(data.dailyRewardsValue).format()} />
            <TooltipItem label="daily ROI" value={`${parseFloat(data.roiDaily * 100).toFixed(2)}%`} />
            <TooltipItem label="monthly rewards" value={currency(data.monthlyRewardsValue).format()} />
            <TooltipItem label="monthly ROI" value={`${parseFloat(data.roiMonthly * 100).toFixed(2)}%`} />
        </Tooltip>
    </Chart>
  </div>
</article>