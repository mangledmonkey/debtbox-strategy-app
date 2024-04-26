import type { FacetData, Contract, DebtBoxProject, DebtBoxToken } from '$lib/types';
import type { ReadContractReturnType } from "@wagmi/core";
import { getContract, type Address, type ContractConstructorArgs, type Abi, type GetContractReturnType } from "viem";
import { getTokenAbi, getContractInformation } from '$lib/utils'
import { getBalance, readContract, readContracts } from "@wagmi/core";
import { config } from '$lib/configs/wagamiConfig';
import { 
    createPublicClient,
    http,
    formatUnits, 
    getAddress 
} from 'viem';
import type { Chain } from 'viem/chains'
// import { chainMap } from '$lib/chains'
import { getPublicClient } from '@wagmi/core'
import { mainnet, bsc } from '@wagmi/core/chains';
import consola from 'consola';


// import { getTokenAbi } from './abiUtils'

export function getTokenPrice(_tokens: DebtBoxToken[], projectId: string): number | undefined {
    const token = _tokens.find((token) => token.id === projectId);

    return token?.attributes.priceUsd;
}

export async function getNftRewards(project: DebtBoxProject, signerAddress: Address|string, chainId: number|null|undefined): Promise<number> {
    const contractData = await getContractInformation(project.attributes.rewardsDistributorAddress, chainId)
    consola.info("🚀 ~ getNftRewards ~ contractData:", contractData)

    if (contractData.abi.length > 0) {
        const abi: Abi = contractData.abi
        const client = getPublicClient(config);

        consola.start('🚀 ~ getNftRewards ~ reading contract', contractData.address,  'on chain', chainId);

        const chain: Chain = bsc

        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })

        try {
            const contract: GetContractReturnType = getContract({
                abi,
                address: project.attributes.rewardsDistributorAddress,
                client,
            })
            consola.info("🚀 ~ getNftRewards ~ contract:", contract)

            // const facets = await contract.facets()
            // console.log("🚀 ~ getNftRewards ~ facets:", facets)
            // const facetData = <FacetData>await publicClient.readContract({
            //     address: getAddress(project.attributes.rewardsDistributorAddress),
            //     abi,
            //     functionName: 'facets',
            //   })
            // console.log("🚀 ~ getNftRewards ~ facetData:", facetData)

            // Build the diamond
            // const diamond: Diamond = {
            //     ...(await getCachedContractInformation(getAddress(address), chain.id, locals.db)),
            //     facets: [],
            // }

            // const facets = await contract.facets()
            // console.log("🚀 ~ getNftRewards ~ facets:", facets)
        } catch (e) {
            consola.error(new Error('🚀 ~ getNftRewards ~ Error fetching balance on: ', e))
        }


        // if (contract) {


        //     const result: ReadContractReturnType = await readContract(config, {
        //         abi: contract.,
        //         address: project.attributes.rewardsDistributorAddress,
        //         functionName: 'tokensOfOwner',
        //         args: [address],
        //     });
            
        //     console.log('data:', result)
            
        //     return result;
        // }
    }

    return 0;
}

/**
 * Get the wallet balance of a token
 * @param _token 
 * @param address 
 * @returns wallet token balance formatted to token decimals 
 */
export async function getTokenBalance(token: DebtBoxToken, address: Address): Promise<number> {
    console.log(`getTokenBalance() ~ Reading balanceOf on token: ${token.attributes.address}, for wallet: ${address}` );
    let tokenBalance: number = 0

    try {
        const contractData = await getContractInformation(token.attributes.address, token.attributes.chainId)
        // console.log("🚀 ~ getTokenBalance ~ contractData:", contractData)
        // const balance = await getBalance(config, {
        //     address: address,
        //     tokenAddress: token.attributes.address
        // });

        const balance: unknown = await readContracts(config, {
            allowFailure: false,
            contracts: [
                {
                    address: token.attributes.address,
                    abi: contractData.abi,
                    functionName: 'balanceOf',
                    args: [address]
                }
            ]
        }) || '0n';
        console.info('token balanceOf: ', balance);
        
        tokenBalance = Number(formatUnits(balance as bigint, token.attributes.decimals));
        console.log("🚀 ~ getTokenBalance ~ tokenBalance:", tokenBalance)
    } catch (error: any) {
        consola.error(`getTokenBalance ~ Error fetching balance on ${token.attributes.address}:\n`, error.message);
    }

    return tokenBalance;
}