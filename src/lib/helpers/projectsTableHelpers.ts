import type { DebtBoxProject, DebtBoxToken, ProjectsTableData } from '$lib/types';
import { getTokenPrice, getTokenBalance, getNftRewards } from '$lib/utils';
import { type Address, getAddress } from 'viem';

/**
 * Get the data for the projects table
 * @param projects 
 * @param tokens 
 * @param signerAddress 
 * @returns project data formatted for table display
 */
export async function getProjectsTableData(projects: DebtBoxProject[], tokens: DebtBoxToken[], address: Address|string, chainId: number|null|undefined) {

    const tableData: ProjectsTableData[] = [];

    for (let i = 0; i < projects.length; i += 1) {
        const project = projects[i];
        const token: DebtBoxToken | undefined = tokens.find(token => token.id === project.relationships.token.data.id)
        const price = getTokenPrice(tokens, project.relationships.token.data.id) || 0;
        const inWallet = token ? await getTokenBalance(token, getAddress(address)) : 0;
        const walletValue =  price && inWallet ? Math.round(((price * inWallet) + Number.EPSILON) * 100) / 100 : 0;
        const rewardsRate = 2;
        const rewards = await getNftRewards(project, address, chainId) || 0;
        const rewardsValue = price && rewards ? (price * rewards) : 0;
        
        const cell: ProjectsTableData = {
            id: i,
            address, 
            icon: project.attributes.uiConfig.logoUri,
            name: project.attributes.name,
            price,
            inWallet,
            walletValue,
            rewardsRate,
            rewards,
            rewardsValue,
        }
        // console.log("🚀 ~ prepareProjectsTableData ~ cell:", cell)
        
        tableData.push(cell)
    }
    // console.log("🚀 ~ prepareProjectsTableData ~ tableData:", tableData)
    
    return tableData;
}