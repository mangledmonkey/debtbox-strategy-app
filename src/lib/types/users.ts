import type { Writable } from "svelte/store";

export type User = {
    id?: number,
    address: string,
};

export type Users = User[];

export type UserContext = Writable<User|undefined>;