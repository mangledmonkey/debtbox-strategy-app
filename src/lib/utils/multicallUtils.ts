import type { Address } from 'viem';
import type { DebtBoxProject, DebtBoxToken, MulticallData } from "$lib/types";

export function getMulticallData(projects: DebtBoxProject[], tokens: DebtBoxToken[], address: Address|string, chainId: number): MulticallData[] {
    const multicallData: MulticallData[];
    

    for (let i = 0; i < projects.length; i += 1) {
        // const 
    }

    return []
}