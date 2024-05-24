import type { Writable } from "svelte/store";

export type Goal = {
    id?: number,
    target: number,
    name: string,
    order: number,
};

export type Goals = Goal[];

export type GoalsContext = Writable<Goals|undefined>;