export type ProjectsTableData = {
    id: number,
    address: Address|string|null,
    icon: string,
    name: string,
    price: number,
    inWallet: number,
    walletValue: number,
    rewardsRate: number | undefined,
    rewards: number | undefined,
    rewardsValue: number | undefined,
}