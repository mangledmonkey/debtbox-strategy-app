<script lang="ts">
    // import connectYourWallet from '../assets/connect-your-web3-wallet-icon.svg?raw'
    // import cryptoWallet from '../assets/crypto-wallet-icon.svg?raw'
    import trackYourReturns from '../assets/icons/track-your-crypto-returns-icon.svg?raw'
    import analyzeOpportunies from '../assets/icons/analyze-returns-for-opportunities-icon.svg?raw'
    import compoundRewards from '../assets/icons/reinvesting-interest-icon.svg?raw'
    import connectWallet from '../assets/icons/connect-your-web3-wallet-icon.svg?raw'
    import importNfts from '../assets/icons/import-nfts-icon.svg?raw'
    import optimizeStrategy from '../assets/icons/optimize-strategy-icon.svg?raw'
    export let name: keyof typeof icons;
    export let width = '120px';
    export let height = '120px';
    export let focusable: string | number | null | undefined = undefined;
    export let preserveAspectRatio: string = 'meet';
    let icons = {
        trackYourReturns: {
            box: 1000,
            svg: trackYourReturns
        },
        analyzeOpportunies: {
            box: 1000,
            svg: analyzeOpportunies
        },
        compoundRewards: {
            box: 1000,
            svg: compoundRewards
        },
        importNfts: {
            box: 1000,
            svg: importNfts
        },
        optimizeStrategy: {
            box: 1000,
            svg: optimizeStrategy
        },
        connectWallet: {
            box: 1000,
            svg: connectWallet
        }
    } as const;
    let displayIcon = icons[name];
</script>

<svg
    class={$$props.class}
    {focusable}
    {width}
    {height}
    {preserveAspectRatio}
    viewBox="0 0 {displayIcon.box} {displayIcon.box}">{@html displayIcon.svg}</svg
>