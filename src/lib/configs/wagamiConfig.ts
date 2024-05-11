import { 
    http, 
    createConfig, 
    type Config, 
    createStorage, 
    cookieStorage 
} from '@wagmi/core'
import { bsc } from '@wagmi/core/chains'
import { injected } from '@wagmi/connectors'

export const config: Config = createConfig({
    chains: [bsc],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
    connectors: [injected()],
    batch: { multicall: true },
    transports: {
        [bsc.id]: http(),
    },
})