<script lang="ts">
	import { getWalletProgressCtx } from '$lib/contexts/walletProgressCtx';
	import type { WalletProgressData } from '$lib/types';
    import { Arc, Chart, Group, LinearGradient, Svg, Text } from 'layerchart';

	const walletProgress = getWalletProgressCtx();

    function getProgressValue(walletProgress: WalletProgressData|undefined) {
        if (walletProgress) {
            let val: number = 0;
            const stage = walletProgress?.status.stage;
            const stages = walletProgress?.status.stages;

            if (stage && stages) val = (stage/stages) * 100
            
            value = val;
        }
    }

    const spring = true;
    let domain = $derived([0, 100]);
    let range = [0, 360];
    let value = $state(0);

    let innerRadius = 50;
    let outerRadius = 60;
    let cornerRadius = 5;
    let padAngle = 0;
    let padRadius = 0;
    let label = 'svg-center';

    $effect(()=> {
        getProgressValue($walletProgress)
    })

	// $inspect('🚀 ~ walletProgress:', $walletProgress);
</script>

<div class="min-h-full w-full">
    {#if $walletProgress}
        <div id="walletProgress" class="h-[200px] w-[200px] mt-20 mx-auto rounded p-4">
            <p class="text-center">Fetching NFT rewards data for {$walletProgress?.walletCount} wallets...</p>
            <Chart>
                <Svg>
                    <Group center>
                        {#key spring}
                            <LinearGradient class="from-primary-400 to-primary" vertical let:url>
                                <Arc
                                    {value}
                                    {domain}
                                    {range}
                                    {innerRadius}
                                    {outerRadius}
                                    {cornerRadius}
                                    {padAngle}
                                    {label}
                                    {spring}
                                    let:value
                                    let:boundingBox
                                    fill={url}
                                    track={{ class: 'fill-surface-content/5' }}
                                >
                                    <Text
                                        value={Math.round(value)}
                                        textAnchor="middle"
                                        verticalAnchor="middle"
                                        class="text-4xl"
                                        dy={8}
                                    />
                                </Arc>
                            </LinearGradient>
                        {/key}
                    </Group>
                </Svg>
            </Chart>
        </div>
    {/if}
</div>