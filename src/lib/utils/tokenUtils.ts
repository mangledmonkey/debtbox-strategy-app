import type { DebtBoxProject, DebtBoxToken, DiamondData } from '$lib/types';
import { type Address } from "viem";
import { getCachedContractInformation, getDiamondInformation } from '$lib/utils'
import { multicall, readContracts } from "@wagmi/core";
import { config } from '$lib/configs/wagamiConfig';
import { 
    formatUnits, 
} from 'viem';
import consola from 'consola';


export function getTokenPrice(_tokens: DebtBoxToken[], projectId: string): number | undefined {
    const token = _tokens.find((token) => token.id === projectId);

    return token?.attributes.priceUsd;
}

export async function getRewardsData(project: DebtBoxProject, signerAddress: Address|string, chainId: number): Promise<DiamondData|undefined> {
    const contractData = await getDiamondInformation(project.attributes.rewardsDistributorAddress, chainId)
    // consola.info("🚀 ~ getRewardsData ~ contractData:", JSON.stringify(contractData))

    try {
        const rewardsDistributorDiamondContract = {
            address: project.attributes.rewardsDistributorAddress,
            abi: contractData.diamondAbi,
        }

        const [ stakedNfts, pendingRewards, rewardsPerSecond ] = <bigint[]>await multicall(config, {
            allowFailure: false,
            contracts: [
                {
                    ...rewardsDistributorDiamondContract,
                    functionName: 'stakedBalanceOf',
                    args: [signerAddress]
                },
                {
                    ...rewardsDistributorDiamondContract,
                    functionName: 'pendingRewards',
                    args: [signerAddress]
                },
                {
                    ...rewardsDistributorDiamondContract,
                    functionName: 'nftRewardsPerSecond',
                    args: []
                },
            ]
        })
        console.log('🚀 ~ getRewardsData ~ stakedNFts:', stakedNfts)
        console.log('🚀 ~ getRewardsData ~ pendingRewards:', pendingRewards)
        console.log('🚀 ~ getRewardsData ~ rewardsPerSecond:', rewardsPerSecond)

        return {
            stakedNfts,
            pendingRewards,
            rewardsPerSecond
        }
        
        // tokenBalance = Number(formatUnits(balance, token.attributes.decimals));
        // console.log("🚀 ~ getRewardsData ~ tokenBalance:", tokenBalance)
    } catch (error: any) {
        consola.error(`getRewardsData ~ Error fetching rewards on ${project.attributes.rewardsDistributorAddress}:\n`, error.message);
    }
}

/**
 * Get the wallet balance of a token
 * @param _token 
 * @param address 
 * @returns wallet token balance formatted to token decimals 
 */
export async function getTokenBalance(token: DebtBoxToken, address: Address): Promise<number> {
    consola.info(`getTokenBalance() ~ Reading balanceOf on token: ${token.attributes.address}, for wallet: ${address}` );
    let tokenBalance: number = 0

    try {
        const contractData = await getCachedContractInformation(token.attributes.address, token.attributes.chainId)
        // console.log("🚀 ~ getTokenBalance ~ contractData:", contractData)
        // const balance = await getBalance(config, {
        //     address: address,
        //     tokenAddress: token.attributes.address
        // });

        const balance = <bigint><unknown>await readContracts(config, {
            allowFailure: false,
            contracts: [
                {
                    address: token.attributes.address,
                    abi: contractData.abi,
                    functionName: 'balanceOf',
                    args: [address]
                }
            ]
        }) || 0n;
        console.info('token balanceOf: ', balance);
        
        tokenBalance = Number(formatUnits(balance, token.attributes.decimals));
        console.log("🚀 ~ getTokenBalance ~ tokenBalance:", tokenBalance)
    } catch (error: any) {
        consola.error(`getTokenBalance ~ Error fetching balance on ${token.attributes.address}:\n`, error.message);
    }

    return tokenBalance;
}