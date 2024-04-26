import type { AbiFactory } from '$lib/types';

// Rewards ABIs
import AluminumRewardsDistributorDiamondAbi from './AluminumRewardsDistributorDiamondAbi';
import BeverageRewardDistributorDiamondAbi from './BeverageRewardDistributorDiamondAbi';
import BlackGoldRewardDistributorDiamondAbi from './BlackGoldRewardDistributorDiamondAbi';
import DebtEcosystemAbi from './DebtEcosystemAbi';
import DigitalGoldRewardDistributorDiamondAbi from './DigitalGoldRewardDistributorDiamondAbi';
import NaturalGasRewardDistributorDiamondAbi from './NaturalGasRewardDistributorDiamondAbi';

// Token ABIs
import BlackGoldTokenAbi from './BlackGoldTokenAbi'

const abiFactory: AbiFactory[] = [
    {
        name: 'DebtEcosystem',
        id: '',
        abi: DebtEcosystemAbi,
        type: 'projects'
    },
    {
        name: 'Beverage Distribution',
        id: 'efa7ebcc-b433-4dd4-a591-8dab9c81b4f2',
        abi: BeverageRewardDistributorDiamondAbi,
        type: 'projects'
    },
    {
        name: 'Rev',
        id: 'a3cf4fdf-e442-4284-8b4a-9377729f8be2',
        abi: null,
        type: 'projects'
    },
    {
        name: 'Drip',
        id: '837f69a1-e1a5-4935-9a52-fb8f013437ae',
        abi: null,
        type: 'projects'
    },
    {
        name: 'Data Center Mining',
        id: '51161410-25b2-46e1-8af6-e9ae5c846add',
        abi: null,
        type: 'projects'
    },
    {
        name: 'Black Gold',
        id: '3a65aef8-0347-49a2-ab7e-d88c62174fa0',
        abi: BlackGoldRewardDistributorDiamondAbi,
        type: 'projects'
    },
    {
        name: 'Digital Gold',
        id: 'e87139e1-375f-40bb-81f2-ea2c52b00421',
        abi: null,
        type: 'projects'
    },
    {
        name: 'Aluminum',
        id: '3d50fdc9-3bbc-4981-bccd-f70cd2165d27',
        abi: AluminumRewardsDistributorDiamondAbi,
        type: 'projects'
    },
    {
        name: 'Natural Gas',
        id: '3f6b976a-5d80-4ef2-b648-b2f608c91156',
        abi: NaturalGasRewardDistributorDiamondAbi,
        type: 'projects'
    },
    {
        name: 'Grow',
        id: '9a7f9118-0265-4d26-a076-bb95c07a514e',
        abi: null,
        type: 'projects'
    },
    {
        name: 'DEBT',
        id: '5aa5bd5b-f66f-4a64-a702-d3ea0a8b10d6',
        abi: null,
        type: 'projects'
    },
    {
        name: 'Blox Real Estate',
        id: '24cc3406-e2d2-4c57-9161-5b3e3dee975f',
        abi: null,
        type: 'projects'
    },
    {
        name: 'Explore',
        id: 'f42db384-3850-43bf-99a4-f928efd1b2e1',
        abi: null,
        type: 'projects'
    },
    {
        name: 'Beverage',
        id: 'd0df359f-5c33-4310-b4e3-2d3e4ec8dd60',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Rev Exotic Vehicles',
        id: '02e5a530-cb79-4dc8-b75d-144c71735479',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Drip',
        id: '6d4fd9ad-6a36-438b-aa13-750517756828',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Data Center Mining',
        id: '71ba74a2-b815-425f-bcdd-06a594b762b9',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Black Gold',
        id: '19cfc96e-fbcc-4508-b5da-1100d67f4deb',
        abi: BlackGoldTokenAbi, 
        type: 'tokens'
    },
    {
        name: 'Digital Gold',
        id: '908bce6e-2fc4-45cf-aaca-54ef494b4351',
        abi: DigitalGoldRewardDistributorDiamondAbi,
        type: 'tokens'
    },
    {
        name: 'Aluminum',
        id: '4438fd90-9d01-4c34-a1f4-48681b253665',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Natural Gas',
        id: 'c32ea2fa-9533-4098-a1c5-637b3ec7e510',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Grow',
        id: '0f7b7ebd-a75f-4394-a3ba-737ed3b87a93',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'DEBT',
        id: '817fbad4-6823-4d68-ad66-7dd6330957c4',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Blox Real Estate',
        id: '9377a6d5-1964-434c-b894-43493cf3a8a2',
        abi: null,
        type: 'tokens'
    },
    {
        name: 'Explore',
        id: 'd18cde64-a304-4517-9361-be98d6dd328e',
        abi: null,
        type: 'tokens'
    },
]

export default abiFactory;