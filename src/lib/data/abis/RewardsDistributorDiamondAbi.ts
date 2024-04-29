import type { Abi } from "viem";

const RewardsDistributorDiamondAbi: Abi = [
    {
      type: 'error',
      inputs: [
        {
          name: '_initializationContractAddress',
          internalType: 'address',
          type: 'address'
        },
        {
          name: '_calldata',
          internalType: 'bytes',
          type: 'bytes'
        }
      ],
      name: 'InitializationFunctionReverted'
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: '_diamondCut',
          internalType: 'struct IDiamondCut.FacetCut[]',
          type: 'tuple[]',
          components: [
            {
              name: 'facetAddress',
              internalType: 'address',
              type: 'address'
            },
            {
              name: 'action',
              internalType: 'enum IDiamondCut.FacetCutAction',
              type: 'uint8'
            },
            {
              name: 'functionSelectors',
              internalType: 'bytes4[]',
              type: 'bytes4[]'
            }
          ],
          indexed: !1
        },
        {
          name: '_init',
          internalType: 'address',
          type: 'address',
          indexed: !1
        },
        {
          name: '_calldata',
          internalType: 'bytes',
          type: 'bytes',
          indexed: !1
        }
      ],
      name: 'DiamondCut'
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: '_diamondCut',
          internalType: 'struct IDiamondCut.FacetCut[]',
          type: 'tuple[]',
          components: [
            {
              name: 'facetAddress',
              internalType: 'address',
              type: 'address'
            },
            {
              name: 'action',
              internalType: 'enum IDiamondCut.FacetCutAction',
              type: 'uint8'
            },
            {
              name: 'functionSelectors',
              internalType: 'bytes4[]',
              type: 'bytes4[]'
            }
          ]
        },
        {
          name: '_init',
          internalType: 'address',
          type: 'address'
        },
        {
          name: '_calldata',
          internalType: 'bytes',
          type: 'bytes'
        }
      ],
      name: 'diamondCut',
      outputs: []
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: '_functionSelector',
          internalType: 'bytes4',
          type: 'bytes4'
        }
      ],
      name: 'facetAddress',
      outputs: [
        {
          name: 'facetAddress_',
          internalType: 'address',
          type: 'address'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'facetAddresses',
      outputs: [
        {
          name: 'facetAddresses_',
          internalType: 'address[]',
          type: 'address[]'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: '_facet',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'facetFunctionSelectors',
      outputs: [
        {
          name: '_facetFunctionSelectors',
          internalType: 'bytes4[]',
          type: 'bytes4[]'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'facets',
      outputs: [
        {
          name: 'facets_',
          internalType: 'struct IDiamondLoupe.Facet[]',
          type: 'tuple[]',
          components: [
            {
              name: 'facetAddress',
              internalType: 'address',
              type: 'address'
            },
            {
              name: 'functionSelectors',
              internalType: 'bytes4[]',
              type: 'bytes4[]'
            }
          ]
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: '_interfaceId',
          internalType: 'bytes4',
          type: 'bytes4'
        }
      ],
      name: 'supportsInterface',
      outputs: [
        {
          name: '',
          internalType: 'bool',
          type: 'bool'
        }
      ]
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'previousOwner',
          internalType: 'address',
          type: 'address',
          indexed: !0
        },
        {
          name: 'newOwner',
          internalType: 'address',
          type: 'address',
          indexed: !0
        }
      ],
      name: 'OwnershipTransferred'
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'owner',
      outputs: [
        {
          name: 'owner_',
          internalType: 'address',
          type: 'address'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: '_newOwner',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: []
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'lastRewardTime',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        },
        {
          name: 'totalRewardsPerSecond',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        },
        {
          name: 'accRewardsPerShare',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        },
        {
          name: 'totalRewardsWeight',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        }
      ],
      name: 'LogUpdatePool'
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'nftRewardsPerSecond',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'releaseUnrewardedTokens',
      outputs: []
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'rewardsStartTime',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: '_rewardsStartTime',
          internalType: 'uint256',
          type: 'uint256'
        }
      ],
      name: 'setRewardsStartTime',
      outputs: []
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'newTreasury',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'setTreasury',
      outputs: []
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalPendingRewards',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalRewardsPerSecond',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalRewardsWeight',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalTreasuryWeight',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'treasury',
      outputs: [
        {
          name: '',
          internalType: 'address',
          type: 'address'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [],
      name: 'updatePool',
      outputs: []
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'user',
          internalType: 'address',
          type: 'address',
          indexed: !0
        },
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        }
      ],
      name: 'MicrosStaked'
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'user',
          internalType: 'address',
          type: 'address',
          indexed: !0
        },
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        }
      ],
      name: 'MicrosUnstaked'
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'user',
          internalType: 'address',
          type: 'address',
          indexed: !0
        },
        {
          name: 'tokenIds',
          internalType: 'uint256[]',
          type: 'uint256[]',
          indexed: !1
        }
      ],
      name: 'NftsStaked'
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'user',
          internalType: 'address',
          type: 'address',
          indexed: !0
        },
        {
          name: 'tokenIds',
          internalType: 'uint256[]',
          type: 'uint256[]',
          indexed: !1
        }
      ],
      name: 'NftsUnstaked'
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: '',
          internalType: 'address',
          type: 'address'
        },
        {
          name: '',
          internalType: 'address',
          type: 'address'
        },
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        },
        {
          name: '',
          internalType: 'bytes',
          type: 'bytes'
        }
      ],
      name: 'onERC721Received',
      outputs: [
        {
          name: '',
          internalType: 'bytes4',
          type: 'bytes4'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256'
        }
      ],
      name: 'stakeMicroTokens',
      outputs: []
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: '_tokenIds',
          internalType: 'uint256[]',
          type: 'uint256[]'
        }
      ],
      name: 'stakeTokens',
      outputs: []
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'stakedBalanceOf',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'stakedMicroBalanceOf',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        },
        {
          name: 'index',
          internalType: 'uint256',
          type: 'uint256'
        }
      ],
      name: 'stakedTokenOfOwnerByIndex',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'stakedTokensOfOwner',
      outputs: [
        {
          name: '',
          internalType: 'uint256[]',
          type: 'uint256[]'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalStakedMicros',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalStakedNfts',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalTreasuryMicros',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'totalTreasuryNfts',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256'
        }
      ],
      name: 'unstakeMicroTokens',
      outputs: []
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: '_tokenIds',
          internalType: 'uint256[]',
          type: 'uint256[]'
        }
      ],
      name: 'unstakeTokens',
      outputs: []
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'user',
          internalType: 'address',
          type: 'address',
          indexed: !0
        },
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        }
      ],
      name: 'RewardsCollected'
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'collectRewards',
      outputs: []
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'feeAddress',
      outputs: [
        {
          name: '',
          internalType: 'address',
          type: 'address'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'feeAmountUsd',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'pendingRewards',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'priceFeed',
      outputs: [
        {
          name: '',
          internalType: 'address',
          type: 'address'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'rewardsPerSecond',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'rewardsWeight',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'newFeeAddress',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'setFeeAddress',
      outputs: []
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256'
        }
      ],
      name: 'setFeeAmountUsd',
      outputs: []
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'newPriceFeed',
          internalType: 'address',
          type: 'address'
        }
      ],
      name: 'setPriceFeed',
      outputs: []
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256'
        }
      ],
      name: 'burn',
      outputs: []
    },
    {
      type: 'event',
      anonymous: !1,
      inputs: [
        {
          name: 'amount',
          internalType: 'uint256',
          type: 'uint256',
          indexed: !1
        }
      ],
      name: 'IntervalBurn'
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [],
      name: 'intervalBurn',
      outputs: []
    },
    {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'lastIntervalBurnTime',
      outputs: [
        {
          name: '',
          internalType: 'uint256',
          type: 'uint256'
        }
      ]
    },
    {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [],
      name: 'updateTotalRewardsPerSecond',
      outputs: []
    }
  ];

export default RewardsDistributorDiamondAbi;
