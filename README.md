# Learning Certificate DApp

A decentralized application for issuing and managing learning certificates on the blockchain.

## Overview

This project is a Web3 application that allows educational institutions to mint learning certificates as NFTs on the Ethereum blockchain. Students can view their issued certificates through a web interface.

## Features

- **Certificate Minting**: Teachers/institutions can mint certificates as NFTs
- **Certificate Viewing**: Students can view their issued certificates
- **Multi-language Support**: Supports English, Chinese, and Korean
- **Blockchain Integration**: Built with Solidity smart contracts and Ethereum

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Blockchain**: Solidity, Hardhat, Ethereum
- **Web3 Integration**: Wagmi, RainbowKit
- **Smart Contracts**: ERC721 NFTs for certificates

## Project Structure

```
learning-certificate-dapp/
├── app/                    # Next.js app router pages
├── components/             # React components
├── contracts/              # Solidity smart contracts
├── scripts/                # Deployment and minting scripts
├── test/                   # Smart contract tests
├── abi/                    # Smart contract ABI
└── lib/                    # Library files
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
# Start Hardhat node
make hardhat-node

# In a new terminal, compile contracts
make compile

# Run tests
make test

# Deploy contracts (to local network)
make deploy
```

### Available Make Commands

```bash
make help          # Show all available commands
make install       # Install dependencies
make dev           # Start development environment
make compile       # Compile smart contracts
make test          # Run tests
make deploy        # Deploy contracts
make clean         # Clean build artifacts
make stop          # Stop services
```

## Smart Contract

The `LearningCertificate` contract is an ERC721 NFT contract that stores certificate information including:
- Course name
- Student name
- Completion date
- Grade
- IPFS hash for additional data

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethereum Documentation](https://ethereum.org/developers/)