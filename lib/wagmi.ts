import type { CreateConnectorFn } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { sepolia, mainnet } from 'wagmi/chains';

export const chains = [sepolia, mainnet];

export const transports = {
  [sepolia.id]: http(),
  [mainnet.id]: http(),
};

export const createWagmiConfig = (connectors: CreateConnectorFn[]) =>
  createConfig({
    autoConnect: true,
    connectors,
    chains,
    transports,
  });
