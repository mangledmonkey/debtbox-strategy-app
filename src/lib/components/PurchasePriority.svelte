<script lang="ts">
	import type { TokenData } from "$lib/types";
	import currency from "currency.js";
    import { sortTokensByDailyRewardsValue } from "$lib/utils";
	import { Card } from "svelte-ux";

    interface Props {
        tokenData: TokenData[],
    }

    let { tokenData }: Props = $props();
    
    const sortedTokenData = $state(sortTokensByDailyRewardsValue(tokenData));
</script>
<article id="purchasePriority" >
    <h2>Purchase Priority</h2>
    <Card class="my-5 p-2 w-full sm:w-48 sm:mx-auto">
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