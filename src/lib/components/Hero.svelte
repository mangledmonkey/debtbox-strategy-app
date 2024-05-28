<script lang="ts">
    import { getContext } from "svelte";
    import { Button } from "svelte-ux";
	import LucideWallet from '~icons/lucide/wallet?raw';
    import heroImg from '$lib/assets/images/hero-image-v1.jpeg'

    const connectToEthereum: Function = getContext('connectToEthereum');

    function connect() {
        connectToEthereum();
    }
</script>

<section id="hero" class="w-full bg-gradient-to-b from-black to-[#00040a] h-[50vh]">
    <div class="hero-bg h-full w-full bg-contain bg-top md:bg-right bg-no-repeat p-5" style={`background-image:url(${heroImg});`} >
        <div class="flex flex-col justify-center w-full md:w-[45%] h-full pt-[200px] md:pt-0">
            <h1>Optimize Your D.E.B.T.&nbsp;Box Rewards</h1>
            <div class="md:text-center">
                <p class="mt-4 text-lg">Track, Analyze, and Compound Returns Across&nbsp;<a href="https://www.thedebtbox.com/">D.E.B.T.&nbsp;NFT&nbsp;Projects</a></p>
                <!-- <Button icon={LucideWallet} rounded="full" variant="outline" color="secondary" on:click={connectToEthereum}>Connect your wallet</Button><br> -->
                <div class="my-3 flex flex-col gap-1 basis-10 mx-auto items-center">
                    <Button classes={{root: "mt-5"}} rounded="full" variant="fill" color="primary" onclick={connect}>Connect Your Wallet</Button>          
                    or
                    <Button classes={{root: "mb-5"}} variant="fill-light" href="/wallets">manually enter your wallet addresses</Button>
                </div>
                <p class="my-2 text-sm text-grey">
                    Your data stays private and secure, stored only in your browser's IndexedDB.
                </p>
            </div>
        </div>
    </div>
    <!-- <div class="hero-bg absolute float-right -z-10 h-[25%] w-full">
        <enhanced:img src={heroImg} />
    </div> -->
</section>

<style>
    @media screen and (width > 768px) {
        .hero-bg {
            background-position: right -33% center; 
        }
    }
</style>