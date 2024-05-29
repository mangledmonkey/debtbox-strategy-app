import type { TableDataStatus, TableDataStatusContext } from '$lib/types';
import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';


export function setTableDataStatusCtx(data: TableDataStatus) {
	const tableDataStatus = writable<TableDataStatus>(data);
	setContext('tableDataStatus', tableDataStatus);
}

export function getTableDataStatusCtx() {
	return getContext<TableDataStatusContext>('tableDataStatus');
}
