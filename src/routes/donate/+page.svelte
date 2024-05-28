<script>
	import { Button, Icon} from "svelte-ux";
    import LucideCopy from '~icons/lucide/copy?raw';
    import LucideCopyCheck from '~icons/lucide/copy-check?raw';

    const walletAddress = '0xf6126cDFF3b8205f0A0e416B59268875b81d07ca';
    let copySuccess = false;

    function copyToClipboard() {
        navigator.clipboard.writeText(walletAddress).then(() => {
            copySuccess = true;
            setTimeout(() => {
                copySuccess = false;
            }, 2000);
        });
    }
  </script>
  
  <div class="min-h-screen bg-surface-100 text-neutral-content py-10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold text-primary mb-10">Support Our Mission</h1>
      <p class="text-lg mb-5">
        Your generosity helps us continue to provide valuable insights and tools for the DEBT Box community. If you find our service useful, please consider making a donation to support our efforts.
      </p>
      <p class="text-lg mb-10">
        We accept crypto donations to the following wallet address:
      </p>
      <div class="bg-neutral-content text-neutral p-4 rounded mb-4 inline-block">
        <Button on:click={copyToClipboard}>
            <code class={`text-lg${copySuccess ? ' text-success': ''}`}>{walletAddress}</code>&nbsp;
            {#if copySuccess}
                <Icon svg={LucideCopyCheck.toString()} class="text-success" />
            {:else}
                <Icon svg={LucideCopy.toString()} />
            {/if}
        </Button>
    </div>
      <p class="text-lg mb-10">
        Thank you for your support and generosity!
      </p>
      <p class="text-sm mb-5">
        <strong>Note:</strong> Always double-check the wallet address before sending any donations.
      </p>
      <p class="text-md mb-5">
        If you have any questions or need assistance, feel free to <a href="/contact" class="text-primary hover:underline">contact us</a>.
      </p>
    </div>
</div>
  
  <style>
    /* Add any additional styles here */
    code {
      font-family: monospace;
      word-break: break-all;
    }
  </style>
  