import type { RequestHandler } from '@sveltejs/kit';
import type { Option, Options, ProjectsTableData } from '$lib/types';
import type { Address } from 'viem';
import { truncateEthAddress, getDebtBoxData } from '$lib/utils';
import { getProjectsTableData } from '$lib/helpers'

export const POST: RequestHandler = async (requestEvent) => {
	const { request } = requestEvent;
	const body = await request.json();
    console.log("🚀 ~ /api/v1/user/tokens:POST ~ body:", body)
    // console.log("🚀 ~ constPOST:RequestHandler= ~ body:", body)
    const wallets: Address[] = typeof body.wallets === 'string' ? JSON.parse(body.wallets) : body.wallets;
	const chainId: number = body.chainId;
    // console.log("🚀 ~ constPOST:RequestHandler= ~ userAddress:", userAddress)

	const debtBoxData = await getDebtBoxData();

	const walletData: Options = []
	
	// Get the user's additional wallets
	for(let i = 0; i < wallets.length; i += 1) {
		try {
			const address: Address|string = wallets[i];
			const tokensData: ProjectsTableData[]|undefined = await getProjectsTableData(debtBoxData.projects, debtBoxData.tokens, address, chainId)
			const truncatedAddress = truncateEthAddress(address)
			console.log("🚀 ~ constPOST:RequestHandler= ~ truncatedAddress:", truncatedAddress)
			const tableData: Option = {
				label: truncatedAddress,
				value: tokensData,
			}
			
			walletData.push(tableData)
		} catch (error){
			console.error("🚀 ~ /api/v1/user/tokens:POST ~ error:", error)
		}
	}

	// Create and insert summary table
	if (wallets.length > 1) {
		const summaryTable: ProjectsTableData[] = [];
		
		for (let i = 0; i < walletData.length; i += 1) {
			const wallet: Option = walletData[i];

			for (let c = 0; c < wallet.value.length; c += 1) {
				const walletCell = wallet.value[c];
				const cellIndex = summaryTable.findIndex(t => t.id === walletCell.id);
				// console.log("🚀 ~ /api/v1/user/tokens:POST ~ createSummaryTable ~ cellIndex:", cellIndex, 'value:', cellIndex > -1 ? summaryTable[cellIndex] : '..')

				if (cellIndex === -1) {
					summaryTable.push(walletCell)
				} else {
					// console.log("🚀 ~ /api/v1/user/tokens:POST ~ createSummaryTable ~ maths ~ cellIndex:", cellIndex, 'value:', cellIndex > -1 ? summaryTable[cellIndex] : '..')
					summaryTable[cellIndex].inWallet += walletCell.inWallet 
					summaryTable[cellIndex].walletValue += walletCell.walletValue 
					summaryTable[cellIndex].stakedNfts += walletCell.stakedNfts 
					summaryTable[cellIndex].unstakedNfts += walletCell.unstakedNfts 
					summaryTable[cellIndex].totalNfts += walletCell.totalNfts 
					summaryTable[cellIndex].rewards += walletCell.rewards 
					summaryTable[cellIndex].rewardsValue += walletCell.rewardsValue 
				}
			}
		}
		
		const summaryWalletData: Option = {
			label: 'Summary',
			value: summaryTable,
		}

		walletData.splice(0, 0, summaryWalletData);
	}

	console.log("🚀 ~ /api/v1/user/tokens:POST ~ walletData:", walletData)

	return new Response(JSON.stringify(walletData), { status: 201 });
};