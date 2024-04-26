import { http, createConfig, type Config } from '@wagmi/core'
import { bsc } from '@wagmi/core/chains'
import { injected } from '@wagmi/connectors'

export const config: Config = createConfig({
    chains: [bsc],
    connectors: [injected()],
    batch: { multicall: true },
    transports: {
        [bsc.id]: http(),
    },
})