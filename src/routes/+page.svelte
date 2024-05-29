<script lang="ts">
	import { connected, signerAddress } from 'svelte-wagmi';
	import { goto } from '$app/navigation';
	import {
		Hero,
		Icons,
	} from '$lib/components';
</script>

{#if !$connected && !$signerAddress}
	<!-- Hero -->
	<Hero />
	<div class="flex flex-col items-center p-5 text-neutral-content">
		<!-- Key Features Section -->
		<section class="my-10 max-w-4xl p-5 text-center sm:w-4/5">
			<h2>Why Choose DEBT Rewards Strategy?</h2>
			<div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
				<article>
					<h3>Track Your Returns</h3>
					<Icons name="trackYourReturns" class="m-auto" />
					<p class="mt-2">
						Monitor the performance of your NFT investments with real-time data and detailed
						analytics.
					</p>
				</article>
				<article>
					<h3>Analyze Opportunities</h3>
					<Icons name="analyzeOpportunies" class="m-auto" />
					<p class="mt-2">
						Identify the best opportunities to maximize your returns with our analysis tools.
					</p>
				</article>
				<article>
					<h3>Compound Rewards</h3>
					<Icons name="compoundRewards" class="m-auto" />
					<p class="mt-2">
						Get insights and directions on how to reinvest your returns to grow your portfolio over
						time.
					</p>
				</article>
			</div>
		</section>

		<!-- How It Works Section -->
		<section class="my-10 max-w-4xl p-5 text-center sm:w-4/5 ">
			<h2>How It Works</h2>
			<div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
				<article>
					<h3>1. Connect Your Wallet</h3>
					<Icons name="connectWallet" class="m-auto" />
					<p class="mt-2">
						Securely connect or add one or more wallets to start tracking and managing your NFT
						investments.
					</p>
				</article>
				<article>
					<h3 class="self-start">2. Monitor Your NFT Rewards</h3>
					<Icons name="importNfts" class="m-auto" />
					<p class="mt-2">
						Automatically scan your NFTs from multiple wallets and summarizes their rewards in one place.
					</p>
				</article>
				<article>
					<h3>3. Optimize Your Strategy</h3>
					<Icons name="optimizeStrategy" class="m-auto" />
					<p class="mt-2">
						Use our tools to analyze, track, and optimize your strategy for maximum returns.*
					</p>
				</article>
			</div>
			<p class="mt-10 text-sm">
				*Note that direct actions such as collecting and compound re-investments are performed on
				the <a href="https://rewards.thedebtbox.com">official team's web app</a>.
			</p>
		</section>

		<!-- Wallet Privacy Section -->
		<section class="my-10 w-4/5 max-w-4xl text-center">
			<h2 class="mb-6 text-2xl font-bold text-primary">Your Wallet Privacy Matters</h2>
			<p class="mb-4 text-lg">
				At DEBT Rewards Strategy, we prioritize your privacy. We do not monitor or store your wallet
				information. All data is kept locally in your browser, ensuring you have full control over
				your financial information.
			</p>
            <p class="mb-4 text-lg text-warning">
                <em>We will never ask you for your private key!</em>
            </p>
			<p class="mb-4 text-lg">
				While we collect visitor analytics to monitor website performance and user traffic, your
				wallet data remains private and secure, solely within your control.
			</p>
		</section>
	</div>
{:else}
	{goto('/dashboard')}
{/if}
