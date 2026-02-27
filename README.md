# DEBT Rewards Strategy

A privacy-first web app for tracking and optimizing your [DebtBox](https://rewards.thedebtbox.com) NFT rewards across multiple wallets.

## Features

- **Multi-wallet tracking** — Add and monitor multiple Ethereum-compatible wallets in one place
- **Rewards analytics** — View summarized NFT reward data with charts and totals
- **Compound strategy** — Get insights on how to reinvest rewards to grow your portfolio
- **Purchase priority** — Identify the best opportunities for maximizing returns
- **Goal tracking** — Set and track reward targets
- **Local-only storage** — All wallet data is stored in your browser's IndexedDB; nothing is sent to a server
- **Encrypted addresses** — Wallet addresses are encrypted at rest using your connected wallet as the key

> **Note:** Direct actions such as collecting rewards and compounding re-investments are performed on the [official DebtBox app](https://rewards.thedebtbox.com). This app is a read-only strategy and analytics tool.

## Privacy

- Wallet addresses are encrypted locally using `crypto-js` — your signing address acts as the encryption key
- No wallet data ever leaves your browser
- We will **never** ask for your private key

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/) — Web3 connectivity (Binance Smart Chain)
- [WalletConnect](https://walletconnect.com/) + injected wallet support (MetaMask, etc.)
- [Dexie](https://dexie.org/) — IndexedDB ORM for local storage
- [Drizzle ORM](https://orm.drizzle.team/) + SQLite — server-side data layer
- [LayerChart](https://layerchart.com/) + [D3](https://d3js.org/) — data visualization
- [svelte-ux](https://svelte-ux.techniq.dev/) + [bits-ui](https://bits-ui.com/) — UI components

## Getting Started

### Prerequisites

- Node.js 18+
- A WalletConnect project ID ([cloud.walletconnect.com](https://cloud.walletconnect.com))
- An Alchemy API key ([alchemy.com](https://www.alchemy.com/))

### Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd debtbox-strategy-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PUBLIC_WALLETCONNECT_ID=your_walletconnect_project_id
   PUBLIC_ALCHEMY_ID=your_alchemy_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type-check with `svelte-check` |
| `npm run lint` | Lint and format check |
| `npm run format` | Auto-format with Prettier |
| `npm run test` | Run all tests (Playwright + Vitest) |
| `npm run test:unit` | Run unit tests (Vitest) |
| `npm run test:integration` | Run integration tests (Playwright) |
| `npm run storybook` | Start Storybook component explorer |

## Usage

1. Visit the app and click **Connect Wallet** to authenticate with MetaMask, WalletConnect, or another injected wallet
2. Your primary wallet is automatically added and tracked
3. Go to **Wallets** to add additional wallet addresses to monitor
4. The **Dashboard** aggregates reward data across all your wallets with analytics and strategy recommendations
