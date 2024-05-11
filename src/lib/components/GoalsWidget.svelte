<script lang="ts">
    import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import Goals from './Goals.svelte';

    const queryClient = new QueryClient();
</script>

<section id="goalsWidget" class="mt-4">
    <QueryClientProvider client={queryClient}>
        <Goals />
    </QueryClientProvider>
</section>