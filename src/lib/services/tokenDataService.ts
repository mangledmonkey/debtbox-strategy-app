import type { 
    DebtBoxProject,
    DebtBoxToken,
    DebtStakingData,
    DiamondData,
    TokenData,
    TokensData,
    WalletProgressDataContext,
    WalletTotals
} from '$lib/types';
import { type Address, getAddress, formatUnits } from 'viem';
import { multicall, readContracts } from "@wagmi/core";
import {
    roundUnits,
    getWalletTotals,
    truncateEthAddress,
    getCachedContractInformation,
    getDiamondInformation,
    updateWalletProgressData
} from '$lib/utils';
import { config } from '$lib/configs/wagamiConfig';
import { debtStakingContract } from '$lib/data/debtStakingContract';
import consola from 'consola';
import { debtTokenStakingAbi } from '$lib/data/abis';

export function getTokenPrice(_tokens: DebtBoxToken[], projectId: string): number | undefined {
    const token = _tokens.find((token) => token.id === projectId);

    return token?.attributes.priceUsd;
}

export async function getRewardsData(project: DebtBoxProject, walletAddress: Address|string, chainId: number, walletProgress: WalletProgressDataContext): Promise<DiamondData|undefined> {
    const contractData = await getDiamondInformation(
        project.attributes.rewardsDistributorAddress,
        chainId,
        walletAddress,
        walletProgress
    );
    // consola.info("🚀 ~ getRewardsData ~ contractData:", JSON.stringify(contractData))
    
    try {
        updateWalletProgressData(walletAddress, walletProgress, true);
        const rewardsDistributorDiamondContract = {
            address: project.attributes.rewardsDistributorAddress,
            abi: contractData.diamondAbi,
        };

        const [
            stakedNfts,
            stakedMicros,
            pendingRewards,
            rewardsPerSecond
        ] = <bigint[]>await multicall(config, {
            allowFailure: false,
            contracts: [
                {
                    ...rewardsDistributorDiamondContract,
                    functionName: 'stakedBalanceOf',
                    args: [walletAddress]
                },
                {
                    ...rewardsDistributorDiamondContract,
                    functionName: 'stakedMicroBalanceOf',
                    args: [walletAddress]
                },
                {
                    ...rewardsDistributorDiamondContract,
                    functionName: 'pendingRewards',
                    args: [walletAddress]
                },
                {
                    ...rewardsDistributorDiamondContract,
                    functionName: 'nftRewardsPerSecond',
                    args: []
                },
            ]
        });
        // console.log('🚀 ~ getRewardsData ~ stakedNFts:', stakedNfts)
        // console.log('🚀 ~ getRewardsData ~ stakedMicros:', stakedMicros)
        // console.log('🚀 ~ getRewardsData ~ pendingRewards:', pendingRewards)
        // console.log('🚀 ~ getRewardsData ~ rewardsPerSecond:', rewardsPerSecond)

        return {
            stakedNfts,
            stakedMicros,
            pendingRewards,
            rewardsPerSecond
        };
        
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
export async function getTokenBalance(
    token: DebtBoxToken,
    walletAddress: Address,
    walletProgress: WalletProgressDataContext
): Promise<number> {
    consola.info(`getTokenBalance() ~ Reading balanceOf on token: ${token.attributes.address}, for wallet: ${truncateEthAddress(walletAddress)}` );
    let tokenBalance: number = 0;

    try {
        updateWalletProgressData(walletAddress, walletProgress, true);
        const contractData = await getCachedContractInformation(
            token.attributes.address,
            token.attributes.chainId,
            walletAddress,
            walletProgress
        );
        // console.log("🚀 ~ getTokenBalance ~ contractData:", contractData)

        const balance = <bigint><unknown>await readContracts(config, {
            allowFailure: false,
            contracts: [
                {
                    address: token.attributes.address,
                    abi: contractData.abi,
                    functionName: 'balanceOf',
                    args: [walletAddress]
                }
            ]
        }) || 0n;
        // console.info('token balanceOf: ', balance);
        
        tokenBalance = Number(formatUnits(balance, token.attributes.decimals));
        console.log("🚀 ~ getTokenBalance ~ tokenBalance:", tokenBalance);
    } catch (error: any) {
        consola.error(`getTokenBalance ~ Error fetching balance on ${token.attributes.address}:\n`, error.message);
    }

    return tokenBalance;
}

/**
 * Get the staking DEBT token staking data for a wallet 
 * @param walletAddress 
 * @param chainId
 * @returns wallet DEBT token staking data
 */
export async function getDebtStakingData(
    walletAddress: Address|string,
    walletProgress: WalletProgressDataContext
): Promise<DebtStakingData> {
    consola.info(`getDebtStakingData() ~ Reading DEBT staking data for wallet for wallet: ${truncateEthAddress(walletAddress)}` );
    updateWalletProgressData(walletAddress, walletProgress);
    
    let debtStakingData: DebtStakingData = {
        baseStakeUnits: 0,
        additionalStakeUnitsForVbox: 0,
        activeTokens: 0,
        maxMintable: 0,
        maxStakeable: 0,
        stakedTokens: 0,
        stakedVbox: 0,
    };

    // Get the debt token data from the contract
    try {
        let stakedTokensCount = 0;
        const debtContract = {
            address: debtStakingContract.address,
            abi: debtTokenStakingAbi,
        };

       const [
            baseStakeUnits,
            additionalStakeUnitsForVbox,
            activeTokens,
            maxMintable,
            maxStakeable,
            stakedTokens,
            stakedVbox 
        ] = await multicall(config, {
            allowFailure: false,
            contracts: [
                {
                    ...debtContract,
                    functionName: 'baseStakeUnits',
                },
                {
                    ...debtContract,
                    functionName: 'additionalStakeUnitsForVbox',
                },
                {
                    ...debtContract,
                    functionName: 'getActive',
                    args: [walletAddress]
                },
                {
                    ...debtContract,
                    functionName: 'getMaxMintable',
                    args: [walletAddress]
                },
                {
                    ...debtContract,
                    functionName: 'getMaxStakeable',
                    args: [walletAddress]
                },
                {
                    ...debtContract,
                    functionName: 'getStaked',
                    args: [walletAddress]
                },
                {
                    ...debtContract,
                    functionName: 'getStakedVbox',
                    args: [walletAddress]
                },
            ]
        });
        // console.log('🚀 ~ getDebtStakingData ~ baseStakeUnits:', baseStakeUnits)
        // console.log('🚀 ~ getDebtStakingData ~ additionalStakeUnitsForVbox:', additionalStakeUnitsForVbox)
        // console.log('🚀 ~ getDebtStakingData ~ activeTokens:', activeTokens)
        // console.log('🚀 ~ getDebtStakingData ~ maxMintable:', maxMintable)
        // console.log('🚀 ~ getDebtStakingData ~ maxStakeable:', maxStakeable)
        // console.log('🚀 ~ getDebtStakingData ~ stakedTokens:', stakedTokens)
        // console.log('🚀 ~ getDebtStakingData ~ stakedVbox:', stakedVbox)

        if (Array.isArray(stakedTokens)) {
            // console.log('🚀 ~ stakedTokens.length:', stakedTokens.length, 'stakedTokens:', stakedTokens)
            stakedTokensCount = stakedTokens.length;
        }

        debtStakingData = {
            baseStakeUnits: Number(baseStakeUnits),
            additionalStakeUnitsForVbox: Number(additionalStakeUnitsForVbox),
            activeTokens: Number(activeTokens),
            maxMintable: Number(maxMintable),
            maxStakeable: Number(maxStakeable),
            stakedTokens: stakedTokensCount,
            stakedVbox: Number(stakedVbox),
        };
        // tokenBalance = Number(formatUnits(balance, token.attributes.decimals));
        // console.log("🚀 ~ getRewardsData ~ tokenBalance:", tokenBalance)
    } catch (error: any) {
        consola.error(`getRewardsData ~ Error fetching DEBT staking data for wallet: ${truncateEthAddress(walletAddress)}\n`, error.message);
    }
    
    // console.log('🚀 ~ debtStakingData:', debtStakingData)
    return debtStakingData;
}

/**
 * Get the data for individual project tokens
 * @param projects 
 * @param tokens 
 * @param walletAddress 
 * @param i
 * @returns TokenData for the provided project
 */
// Collect token values
async function getTokenData(
    project: DebtBoxProject,
    tokens: DebtBoxToken[],
    walletAddress: Address|string,
    chainId: number,
    walletProgress: WalletProgressDataContext,
    i: number
): Promise<TokenData|void> {
    updateWalletProgressData(walletAddress, walletProgress);

    const token: DebtBoxToken|undefined = tokens.find(token => token.id === project.relationships.token.data.id);
    const decimals: number = token?.attributes.decimals || 8;
    const rewardsData = await getRewardsData(project, walletAddress, chainId, walletProgress);

    // Prepare table data
    const price = getTokenPrice(tokens, project.relationships.token.data.id) || 0;
    const inWallet: number = token ? Number((await getTokenBalance(token, getAddress(walletAddress), walletProgress)).toFixed(4)) : 0;
    const walletValue: number = price && inWallet ? price * inWallet : 0;
    const stakedNfts: number = 
        rewardsData?.stakedNfts ? Number(formatUnits(rewardsData?.stakedNfts, 0)) : 0;
    const unstakedNfts: number =  0; //getUnstakedNfts() || 0; // TODO
    const stakedMicros: number =
        rewardsData?.stakedMicros ? Number(formatUnits(rewardsData?.stakedMicros, 0)) : 0;
    const unstakedMicros: number =  0; //getUnstakedNfts() || 0; // TODO
    const totalNfts: number = stakedNfts + unstakedNfts + stakedMicros + unstakedMicros;
    const rewardsRate: number = 
        rewardsData?.rewardsPerSecond
        ? Number(formatUnits(rewardsData?.rewardsPerSecond, decimals))
        : 0;
    const dailyRewardsRate: number = rewardsRate * (60 * 60 * 24);
    const dailyRewardsValue: number = dailyRewardsRate * price;
    const dailyWalletRewardsRate: number = stakedNfts * dailyRewardsRate;
    const dailyWalletRewardsValue: number = dailyWalletRewardsRate * price;
    const weeklyWalletRewardsRate: number = dailyWalletRewardsRate * 7;
    const weeklyWalletRewardsValue: number = weeklyWalletRewardsRate * price;
    const monthlyWalletRewardsRate: number = dailyWalletRewardsRate * 30;
    const monthlyWalletRewardsValue: number = monthlyWalletRewardsRate * price;
    const yearlyWalletRewardsRate: number = dailyWalletRewardsRate * 365;
    const yearlyWalletRewardsValue: number = yearlyWalletRewardsRate * price;
    const rewards = 
        rewardsData?.pendingRewards 
        ? Number(Number(formatUnits(rewardsData?.pendingRewards, decimals)).toFixed(0))
        : 0; // TODO
    const rewardsValue: number = price && rewards ? roundUnits(price * rewards) : 0;
    
    const values: TokenData = {
        id: i,
        address: token?.attributes.address,
        icon: project.attributes.uiConfig.logoUri,
        name: project.attributes.name,
        symbol: token ? token.attributes.symbol : "",
        price,
        inWallet,
        walletValue,
        stakedNfts,
        unstakedNfts,
        stakedMicros,
        unstakedMicros,
        totalNfts,
        rewardsRate,
        dailyRewardsRate,
        dailyRewardsValue,
        dailyWalletRewardsRate,
        dailyWalletRewardsValue,
        weeklyWalletRewardsRate,
        weeklyWalletRewardsValue,
        monthlyWalletRewardsRate,
        monthlyWalletRewardsValue,
        yearlyWalletRewardsRate,
        yearlyWalletRewardsValue,
        rewards,
        rewardsValue,
    };

    if (totalNfts === 0 && project.attributes.name !== 'DEBT') {
        throw new Error(`No NFTs in ${truncateEthAddress(walletAddress)} for ${project.attributes.name}`);
    }

    return values;
}

/**
 * Get the data for the projects table
 * @param projects 
 * @param tokens 
 * @param walletAddress 
 * @returns project data formatted for table display
 */
export async function getTokensData(
    projects: DebtBoxProject[],
    tokens: DebtBoxToken[],
    walletAddress: Address|string,
    chainId: number,
    walletProgress: WalletProgressDataContext
): Promise<TokensData> {
    const debtStakingData: DebtStakingData|undefined = await getDebtStakingData(walletAddress, walletProgress);
    updateWalletProgressData(walletAddress, walletProgress);

    const tokenData: Promise<TokenData|void>[] = projects.map(async (project, i) => {
        console.log('🚀 ~ tokenData: fetching data for:', project);
        return getTokenData(project, tokens, walletAddress, chainId, walletProgress, i)
            .catch(error => undefined);
    });
    
    console.log('🚀 ~ consttokenData:Promise<TokenData|undefined>[]=projects.map ~ tokenData:', tokenData);

    const tokenValues = await Promise.all(tokenData);
    
    const filteredTokenValues: (TokenData|void)[] = tokenValues.filter(results => results !== undefined);

    // Total the wallet values
    const totals: WalletTotals = getWalletTotals(filteredTokenValues, debtStakingData, walletAddress, walletProgress);


    // console.log("🚀 ~ prepareTokensData ~ cell:", cell)
    const tokensData = {
        tokens: filteredTokenValues,
        totals
    };

    if (!tokensData) throw new Error(`No NFTs in wallet for ${walletAddress}`);
    
    console.log('🚀 ~ tokensData:', tokensData);
    return tokensData;
}
