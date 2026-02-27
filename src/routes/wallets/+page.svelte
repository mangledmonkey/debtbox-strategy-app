<script lang="ts">
	import type { UserContext, Wallet, WalletsContext } from "$lib/types";
    import { db } from "$lib/db";
    // import WAValidator from 'multicoin-address-validator';
    import { decryptWallet, encryptWallet, truncateEthAddress } from "$lib/utils";
	import { Button, Form, TextField } from "svelte-ux";
    import LucideTrash2 from '~icons/lucide/trash-2?raw';
	import { isAddress, type Address } from "viem";
    import consola from "consola";
	import { getUserCtx, getWalletsCtx } from "$lib/contexts";
	import { signerAddress } from "svelte-wagmi";

    const user: UserContext = getUserCtx();
    const wallets: WalletsContext = getWalletsCtx();

    let newWallet: string = $state('');
    let isValidAddress: boolean = $state(false);

    function updateNewWallet(address: string) {
        newWallet = address;
        isValidAddress = isAddress(address);
        console.log('🚀 ~ updateNewWallet ~ isValidAddress:', isValidAddress);
    }
    
    $inspect('🚀 ~ newWallet:', newWallet);
    // let isValidAddress: boolean = $state(false);
    let inputError: string|undefined = $state()
    function setInputError(error: string) {
        inputError = error;
        setTimeout(() => {
            inputError = undefined;
        }, 2000);
    }

    function addWallet() {
        if ($user && !!newWallet && isValidAddress && $signerAddress) {
            consola.info(`Adding ${newWallet} to database`);
            const order = Number(db.wallets.count) + 1 || 0;

            db.wallets.add({
                userId: $user?.id,
                address: encryptWallet(newWallet, $signerAddress),
                order,
            })
            .catch(() => {
                setInputError('Address already entered');
            });   
        } else if (!isValidAddress) {
            setInputError('Invalid wallet address');
        }
    }

    function removeWallet(wallet: Wallet) {
        if (wallet.id) {
            consola.info(`Removing ${wallet.address} from database`);
            db.wallets.where('id').equals(wallet.id).delete();
        }
    }

    $inspect('🚀 isValidAddress:', isValidAddress);
    $inspect('$wallets:', $wallets)
</script>

<div class="p-5 min-h-full">
    <h1>My Wallets</h1>
    <div class="mt-10 max-w-[60%] mx-auto flex flex-col">
        Add a Wallet
        <fieldset class="mt-2 mb-10 flex flex-row justify-between">
            <TextField
                label="Wallet Address"
                placeholder="0x..."
                value={newWallet}
                on:change={(e) => {
                    if (typeof e.detail.value === 'string') {
                        updateNewWallet(e.detail.value);
                    }
                }}
                max={42}
                autofocus
                clearable
                classes={{
                    root: "w-full",
                    input: `${inputError ? 'text-danger' : `${isValidAddress ? 'text-success' : ''}`}`
                }}
                error={inputError}                
            />

            <Button type="submit" onclick={addWallet}>Add</Button>
            <!-- <Input mask="_x________________________________" placeholder="0x..."/> -->
        </fieldset>

        {#if $wallets && $signerAddress}
            <div class="mx-auto flex flex-col">
                {#each $wallets as wallet}
                    {@const address = decryptWallet(wallet.address, $signerAddress)}
                    <div class="flex flex-row items-center gap-5">
                        <p class="align-bottom">
                            {truncateEthAddress(address)}
                        </p>

                        <div class="mx-auto">
                            {#if address === $signerAddress}
                                <span class="text-gray-500">primary</span>
                            {:else}
                                <Button
                                    classes={{
                                        root: "mx-auto hover:text-danger",
                                        icon: "text-danger",
                                    }}
                                    iconOnly
                                    icon={LucideTrash2}
                                    on:click={() => removeWallet(wallet)}
                                />
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>