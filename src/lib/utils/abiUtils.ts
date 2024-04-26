import { type Abi, type AbiFunction, type Address } from 'viem'
import type { Contract } from '$lib/types'
import { abiFactory } from "$lib/data/abis";
import consola from 'consola';
import { memoryCache } from '$lib/cache'

/**
 * Get the contract ABI for a given project
 * @param id 
 * @param type
 * @returns the ABI object of a given project id
 */
export function getTokenAbi(id: string, type: string) {
    const project = abiFactory.find(obj => obj.id === id && obj.type === type)
    // console.log("🚀 ~ getTokenAbi ~ abi:", project?.abi)

    return project?.abi;
}

export type FacetData = Array<[Address, string[]]>

export const getContractInformation = async (
    address: Address|string,
    chainId: number|null|undefined,
  ): Promise<Contract> => {

    const cachekey = `contractInfo_${address}`;

    // Set contractData from existing cache
    let contractData: Contract = await memoryCache.get(cachekey) || { name: 'Unverified', address, abi: [] }
    // consola.info('🚀 ~ contractData from cache:', contractData)

    if (contractData.abi.length === 0) {
        consola.info('getContractInformation() ~ no cached data found')
        try {   
            consola.info('Fetching contract information for', address, 'on chain', chainId)

            contractData = await fetch(`https://anyabi.xyz/api/get-abi/${chainId}/${address}`)
                .then(res => {
                    // console.log("🚀 ~ response:", res)
                    if (res.status === 400) return contractData

                    return res.json()
                })

            memoryCache.set(cachekey, contractData, 30 * 1000)
            // console.info(`contractData cached for ${address}:`, await memoryCache.get(cachekey))

        } catch (e) {
            consola.error(e)
            throw new Error('Contract not found')
        }
    }

    return {
        ...contractData,
        address
    }
}