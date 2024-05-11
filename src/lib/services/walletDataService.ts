import type { RequestHandler } from '@sveltejs/kit';
import type { Option, Options, TokenData, WalletTotals } from '$lib/types';
import type { Address } from 'viem';
import { truncateEthAddress, getDebtBoxData, getWalletTotals } from '$lib/utils';
import { getTokensData } from './tokenData'

export async function getWalletData(wallets: Address[]|string|null, chainId: number|null|undefined ): Promise<Options>  {
    console.log("🚀 ~ getTokenData ~ start")

	const debtBoxData = await getDebtBoxData();

	const walletData: Options = []

    if (wallets && chainId) {
        // Get the user's additional wallets
        for(let i = 0; i < wallets.length; i += 1) {
            const address: Address|string = wallets[i];
            
            try {
                const truncatedAddress = truncateEthAddress(address)
                
                const tokensData = await getTokensData(debtBoxData.projects, debtBoxData.tokens, address, chainId);
                
                const tableData: Option = {
                    label: truncatedAddress,
                    value: tokensData,
                }
                
                walletData.push(tableData)
            } catch (error){
                console.error("🚀 ~ walletDataService ~ error:", error)
            }
            }
        

        // Create and insert summary table
        if (wallets.length > 1) {
            const summaryTable: TokenData[] = [];

            for (let i = 0; i < walletData.length; i += 1) {
                const wallet: Option = walletData[i];
                const walletTotals: WalletTotals = wallet.value.totals; 

                for (let c = 0; c < wallet.value.tokens.length; c += 1) {
                    const walletCell = wallet.value.tokens[c];

                    if (walletCell) {
                        const cellIndex = summaryTable.findIndex(t => t.id === walletCell.id);
                        // console.log("🚀 ~ /api/v1/user/tokens:POST ~ createSummaryTable ~ cellIndex:", cellIndex, 'value:', cellIndex > -1 ? summaryTable[cellIndex] : '..')
        
                        if (cellIndex === -1) {
                            summaryTable.push(walletCell)
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

            const summaryTotals = getWalletTotals(summaryTable)

            // summaryTotals.avgDailyNftReturn = summaryTotals.dailyReturns / summaryTotals.stakedNfts;
            
            const summaryWalletData: Option = {
                label: 'Summary',
                value: {
                    tokens: summaryTable,
                    totals: summaryTotals,
                },
            }

            walletData.splice(0, 0, summaryWalletData);
        }

        console.log("🚀 ~ walletDataService ~ walletData:", walletData)
    }

    return walletData;
};