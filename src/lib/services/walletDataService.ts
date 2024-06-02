import type { DebtStakingData, Option, Options, TokenData, WalletProgressDataContext, Wallets } from '$lib/types';
import type { Address } from 'viem';
import {
    truncateEthAddress,
    getDebtBoxData,
    getWalletTotals,
    formatWalletProgressData,
    updateWalletProgressData,
    decryptWallet
} from '$lib/utils';
import { getTokensData } from './tokenDataService';

export async function getWalletData(
    wallets: Wallets,
    signerAddress: string,
    chainId: number|null|undefined,
    walletProgress: WalletProgressDataContext
): Promise<Options>  {
    console.log("🚀 ~ getTokenData ~ start");
    const addresses: (Address|string)[] = wallets.map((wallet => {
        return decryptWallet(wallet.address, signerAddress);
    }));

    const stagesCount: number = 16;
    walletProgress.update(() => formatWalletProgressData(addresses, stagesCount));
    console.log('🚀 ~ getWalletData ~ initial walletProgress:', walletProgress);
    
	const debtBoxData = await getDebtBoxData();

	const walletData: Options = [];

    if (addresses && chainId) {
        // Get the user's additional wallets
        for(let i = 0; i < addresses.length; i += 1) {
            const walletAddress: Address|string = addresses[i];
            updateWalletProgressData(walletAddress, walletProgress);
            
            try {
                const truncatedAddress = truncateEthAddress(walletAddress);

                const tokensData = await getTokensData(
                    debtBoxData.projects,
                    debtBoxData.tokens,
                    walletAddress,
                    chainId,
                    walletProgress
                );
                
                const tableData: Option = {
                    label: truncatedAddress,
                    value: tokensData,
                };
                
                walletData.push(tableData);
            } catch (error){
                console.error("🚀 ~ walletDataService ~ error:", error);
            }
        }
        

        // Create and insert summary table
        if (addresses.length > 1) {
            const summaryTable: TokenData[] = [];
            const debtStakingData: DebtStakingData = {
                baseStakeUnits: 0,
                additionalStakeUnitsForVbox: 0,
                activeTokens: 0,
                maxMintable: 0,
                maxStakeable: 0,
                stakedTokens: 0,
                stakedVbox: 0,
            };

            // Loop each table data object in the wallet data
            for (let i = 0; i < addresses.length; i += 1) {
                updateWalletProgressData(addresses[i], walletProgress);

                const wallet: Option = walletData[i];
                const tokens = wallet.value.tokens;
                const totals = wallet.value.totals;

                // Tally debt token staking values
                debtStakingData.baseStakeUnits += totals.baseStakeUnits;
                debtStakingData.additionalStakeUnitsForVbox
                    += totals.additionalStakeUnitsForVbox;
                debtStakingData.activeTokens += totals.activeTokens;
                debtStakingData.maxMintable += totals.maxMintable;
                debtStakingData.maxStakeable += totals.maxStakeable;
                debtStakingData.stakedTokens += totals.stakedTokens;
                debtStakingData.stakedVbox  += totals.stakedVbox;

                // Total the token values
                for (let c = 0; c < tokens.length; c += 1) {
                    const walletCell = tokens[c];

                    if (walletCell) {
                        const cellIndex = summaryTable.findIndex(t => t.id === walletCell.id);
                        // console.log("🚀 ~ /api/v1/user/tokens:POST ~ createSummaryTable ~ cellIndex:", cellIndex, 'value:', cellIndex > -1 ? summaryTable[cellIndex] : '..')
        
                        if (cellIndex === -1) {
                            summaryTable.push(walletCell);
                        } else {
                            // console.log("🚀 ~ /api/v1/user/tokens:POST ~ createSummaryTable ~ maths ~ cellIndex:", cellIndex, 'value:', cellIndex > -1 ? summaryTable[cellIndex] : '..')
                            summaryTable[cellIndex].inWallet += walletCell.inWallet; 
                            summaryTable[cellIndex].walletValue += walletCell.walletValue;
                            summaryTable[cellIndex].stakedNfts += walletCell.stakedNfts;
                            summaryTable[cellIndex].unstakedNfts += walletCell.unstakedNfts;
                            summaryTable[cellIndex].totalNfts += walletCell.totalNfts;
                            summaryTable[cellIndex].rewards += walletCell.rewards;
                            summaryTable[cellIndex].rewardsValue += walletCell.rewardsValue;
                        }
                    }
                }
            }

            console.log('🚀 ~ getWalletData ~ summary ~ debtStakingData:', debtStakingData);
            const summaryTotals = getWalletTotals(summaryTable, debtStakingData);

            // summaryTotals.avgDailyNftReturn = summaryTotals.dailyReturns / summaryTotals.stakedNfts;
            
            const summaryWalletData: Option = {
                label: 'Summary',
                value: {
                    tokens: summaryTable,
                    totals: summaryTotals,
                },
            };

            walletData.splice(0, 0, summaryWalletData);
        }

        console.log("🚀 ~ walletDataService ~ walletData:", walletData);
    }

    return walletData;
};