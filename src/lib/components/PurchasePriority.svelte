<script lang="ts">
	import type { TokenData } from "$lib/types";
	import currency from "currency.js";
	import { Card } from "svelte-ux";

    export let tokenData: TokenData[]

    function sortTokensByDailyRewardsValue(tokenData: TokenData[]): TokenData[] {
        const sortedTokenData: TokenData[] = [...tokenData]
        return sortedTokenData.sort((a, b) => {
            const keyA = a.dailyRewardsValue;
            const keyB = b.dailyRewardsValue;
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        }) 
    }

    let sortedTokenData: TokenData[];
    $: sortedTokenData = sortTokensByDailyRewardsValue(tokenData);
</script>
<article id="purchasePriority">
    <h3>Purchase Priority</h3>
    <Card class="p-2 w-full sm:w-48 sm:mx-auto">
        <ol class="flex flex-col sm:flex-wrap w-40 self-center sm:gap-2 justify-evenly">
            {#each sortedTokenData as token, i}
                <li class="flex flex-row justify-between basis-2/3 sm:basis-auto">
                    <span class="font-bold">
                        {i + 1}. {token.symbol.toUpperCase()}:&nbsp;
                    </span> 
                    <span>{currency(token.dailyRewardsValue).format()}</span>
                </li>
            {/each}
        </ol>
    </Card>
</article>