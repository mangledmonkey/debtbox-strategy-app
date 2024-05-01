import { type Address } from 'viem'
import type { Contract } from '$lib/types'
import consola from 'consola';
import { memoryCache } from '$lib/cache'

export const getContractInformation = async (
    address: Address|string,
    chainId: number|null|undefined,
  ): Promise<Contract> => {
    try {
        const response = await fetch(`https://anyabi.xyz/api/get-abi/${chainId}/${address}`)
        if (!response.ok) return { name: 'Unverified', address, abi: [] }
        const contractData = await response.json()
    
        return {
             ...contractData,
            address,
        }
    } catch (e) {
        consola.error(e)
        throw new Error('Contract not found')
    }
}

export const getCachedContractInformation = async (
    address: Address,
    chainId: number
  ): Promise<Contract> => {
    try {
      consola.info('Fetching contract information for', address, 'on chain', chainId)
      const cachekey = `contractInfo_${address}`;
      // consola.info('🚀 ~ contractData from cache:', contractData)

      const contractData: Contract|undefined = await memoryCache.get(cachekey);
      // console.log("🚀 ~ getCachedContractInformation ~ contractData:", contractData)
  
      if (contractData) {
        consola.info('Found in memory cache')
        return {
          name: contractData.name,
          abi: contractData.abi,
          address,
        }
      }

      // Get contract data if no cache found
      consola.info('getContractInformation() ~ no cached data found')
      const contract = await getContractInformation(address, chainId)
  
      // Don't cache unverified contracts
      if (contract.name === 'Unverified') {
        return contract
      }
  
      // Update the cache
      consola.info('Updating memory cache')
      const cacheData = {
        id: `${chainId}:${address}`,
        name: contract.name,
        address,
        abi: contract.abi,
        chainId,
      }
      memoryCache.set(cachekey, cacheData, 1800 * 1000)
      // console.log(`🚀 ~ memoryCache.set(${address}):`, await memoryCache.get(cachekey))
      
  
      return contract
    } catch (e) {
      consola.error(e)
      throw new Error('Contract not found')
    }
}

// export function getUnstakedNfts(contractAddress: Address|string, userAddress: Address|string, chainId: number) {
    

// }
