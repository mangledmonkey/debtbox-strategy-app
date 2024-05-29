<script lang="ts">
	import type { Wallet } from "$lib/types";
    import { type Observable } from "dexie";
    import { db } from "$lib/db";
    import { liveQuery } from "dexie";
    // import WAValidator from 'multicoin-address-validator';
    import { truncateEthAddress } from "$lib/utils";
	import { Button, Form, TextField } from "svelte-ux";
    import LucideWallet from '~icons/lucide/wallet?raw';
    import LucideCircleMinus from '~icons/lucide/circle-minus?raw';
    import LucideCheck from '~icons/lucide/check?raw';
	import type { Address } from "viem";
    import consola from "consola";


    let wallets = liveQuery(
        () => db.wallets.toArray()
    );

    let newWallet: string|undefined = $state();
    // let valid: boolean = false;
    let addressError: string|undefined;

    function addWallet() {
        consola.info(`Adding ${newWallet} to database`);
        // if (valid) {
            const order = Number(db.wallets.count) + 1 || 0;
            console.log('🚀 ~ addWallet ~ order:', order)
            db.wallets.add({
                order,
                address: newWallet || '0x',
                primary: false
            });
        // }

    }

    function makePrimary(wallet: Wallet) {

    }

    function removeWallet(wallet: Wallet) {

    }

    // function validateWallet(value) {
    //     var valid = WAValidator.validate(newWallet);
    //     if (valid || newWallet === '') {
    //         addressError = undefined;
    //     } else {
    //         addressError = 'Address INVALID';
    //     }
    // }

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
                        newWallet = e.detail.value;
                    }
                }}
                
                max={42}
                autofocus
                clearable
                classes={{root: "w-full"}}
                error={addressError}                
            />

            <Button type="submit" onclick={addWallet}>Add</Button>
            <!-- <Input mask="_x________________________________" placeholder="0x..."/> -->
        </fieldset>

        {#if $wallets}
            <div class="w-full flex flex-col">
                {#each $wallets as wallet}
                    <div class="flex flex-row w-full">
                        <p class="align-bottom">{truncateEthAddress(wallet.address)}</p>
                        <div>
                            {#if wallet.primary}
                                <Button
                                    iconOnly
                                    icon={LucideCheck}
                                    classes={{icon: "text-green"}} 
                                />
                            {:else}
                                <Button
                                    iconOnly
                                    icon={LucideCheck}
                                    onclick={makePrimary(wallet)}
                                    classes={{icon:"grey hover:text-green-300"}}
                                />
                            {/if}
                            <Button
                                iconOnly
                                icon={LucideCircleMinus}
                                onclick={removeWallet(wallet)}
                            />
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>