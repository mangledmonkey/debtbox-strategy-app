import type { Abi } from "viem";

const AluminumRewardsDistributorDiamondAbi: Abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_contractOwner",
                type: "address",
            },
            {
                internalType: "address",
                name: "_diamondCutFacet",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_initializationContractAddress",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "_calldata",
                type: "bytes",
            },
        ],
        name: "re",
        type: "error",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];

export default AluminumRewardsDistributorDiamondAbi;
