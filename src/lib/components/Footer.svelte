<script>
	import { Icon } from 'svelte-ux';
	import LucideHeart from '~icons/lucide/heart?raw';	// Get the current year

	let year = new Date().getFullYear();
</script>

<footer class="bg-surface-200 py-4 text-center text-neutral-content justify-self-end">
	<div class="container mx-auto">
		<p class="text-sm">&copy; {year} DEBT Rewards Strategy. All rights reserved.</p>
		<nav class="mt-2">
			<a href="/privacy-policy" class="mx-2 text-primary hover:underline">Privacy Policy</a>
			<a href="/terms-of-service" class="mx-2 text-primary hover:underline">Terms of Service</a>
			<a href="/donate" class="mx-2 text-primary hover:underline">Donate&nbsp;<Icon data={LucideHeart} style="color: #ae1114" size={14} /></a>
			<a href="/contact" class="mx-2 text-primary hover:underline">Contact</a>
		</nav>
	</div>
</footer>