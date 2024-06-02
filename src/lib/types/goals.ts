import type { Writable } from "svelte/store";

export type Goal = {
    id?: number,
    userId: number,
    target: number,
    name: string,
};

export type Goals = Goal[];

export type GoalsContext = Writable<Goals|undefined>;