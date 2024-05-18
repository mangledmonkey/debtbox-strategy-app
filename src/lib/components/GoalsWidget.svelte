<script lang="ts">
    import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import Goals from './Goals.svelte';

    const queryClient = new QueryClient();
</script>

<section id="goalsWidget" class="w-full">
    <h3>Goals</h3>
    <QueryClientProvider client={queryClient}>
        <Goals />
    </QueryClientProvider>
</section>