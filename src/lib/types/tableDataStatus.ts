import type { Writable } from "svelte/store";

export type TableDataStatus = {
    loading: boolean,
    loaded: boolean,
};

export type TableDataStatusContext = Writable<TableDataStatus>;