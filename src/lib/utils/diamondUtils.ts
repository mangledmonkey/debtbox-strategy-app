import type { Contract, Diamond, DiamondInfo, FacetData } from '$lib/types'
import { type Abi, type Address, parseAbi, getAddress, toFunctionSelector } from 'viem'
import { readContracts } from "@wagmi/core";
import { memoryCache } from '$lib/cache'
import consola from 'consola';
import { getCachedContractInformation } from './contractUtils'
import { config } from '$lib/configs/wagamiConfig'
import { RewardsDistributorDiamondAbi } from '$lib/data/abis';

export const getDiamondInformation = async (
    address: Address|string,
    chainId: number,
  ): Promise<DiamondInfo> => {

    const cachekey = `diamondInfo_${address}`;

    // Set contractData from existing cache
    consola.info('getDiamondInformation() ~ no cached data found')
    const abi = parseAbi(['function facets() view returns ((address,bytes4[])[])'])

    try {   
        consola.info('Fetching diamond information for', address, 'on chain', chainId)
        let diamondAbi: Abi = RewardsDistributorDiamondAbi;

        // Fetch all facet addresses
        const facetData = <FacetData><unknown>await readContracts(config, {
            allowFailure: false,
            contracts: [
                {
                    address: getAddress(address),
                    abi: abi,
                    functionName: 'facets',
                }
            ]
        })

        // Build the diamond
        const diamond: Diamond = {
            ...(await getCachedContractInformation(getAddress(address), chainId)),
            facets: [],
        }

        // Fetch all facet information
        for (const [address, selectors] of facetData) {
            const facet = await buildFacet(address, selectors, chainId,)
            // console.log("🚀 ~ facet:", facet)
            if (!facet) continue
            diamond.facets.push(facet)
            diamondAbi = [...diamondAbi, ...facet.abi]
        }

        memoryCache.set(cachekey, diamond, 30 * 1000)
        // console.info(`contractData cached for ${address}:`, await memoryCache.get(cachekey))

        return {
            chainId,
            address,
            diamond,
            diamondAbi
        }

    } catch (e) {
        consola.error(e)
        throw new Error('Contract not found')
    }
}

const buildFacet = async (
    address: Address,
    selectors: string[],
    chainId: number
  ): Promise<Contract | undefined> => {
    const facet: Contract = await getCachedContractInformation(address, chainId)
  
    const abiSigs = []
    if (!facet.abi.length) {
      for (const s of selectors) {
        const sig = await getFuncSigBySelector(s)
        abiSigs.push(`function ${sig}`)
      }
      facet.abi = parseAbi(abiSigs)
    }
  
    const fileredAbi: Abi = facet.abi.filter((item) => {
      if (item.type !== 'function') return true
      if (!item.outputs) {
        item.outputs = []
      }
      return selectors.includes(toFunctionSelector(item))
    })
  
    facet.abi = fileredAbi
  
    return facet
  }

  export const getFuncSigBySelector = async (selector: string): Promise<string> => {
    const response = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?function=${selector}&filter=true`,
    )
    const data = await response.json()
  
    if (data && data.result && data.result.function && data.result.function[selector]) {
      return data.result.function[selector][0].name
    }
  
    return 'unknown()'
  }