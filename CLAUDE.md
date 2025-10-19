# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a decentralized application (DApp) for issuing and managing learning certificates on the blockchain. The project is built with Next.js using the App Router, TypeScript, Tailwind CSS, and Web3 technologies.

## Key Technologies Used

1. **Next.js** - React framework with App Router
2. **TypeScript** - Typed superset of JavaScript
3. **Tailwind CSS** - Utility-first CSS framework
4. **shadcn/ui** - UI component library
5. **Web3 Integration**:
   - Wagmi - React hooks for Ethereum
   - RainbowKit - Wallet connection UI
   - Sepolia testnet for deployment
6. **Internationalization**:
   - i18next for multi-language support (English, Chinese, Korean)

## Project Structure

```
learning-certificate-dapp/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with Web3 and i18n providers
│   ├── page.tsx           # Student view: certificate viewing page
│   └── mint/page.tsx      # Teacher view: certificate minting form
├── components/            # React components
│   ├── CertificateCard.tsx
│   └── LanguageSwitcher.tsx
├── lib/                   # Library files
│   └── wagmi.ts           # Web3 configuration
├── i18n/                  # Internationalization setup
│   ├── index.ts
│   └── locales/           # Language JSON files
├── abi/                   # Smart contract ABI
│   └── LearningCertificate.json
├── scripts/               # Deployment and minting scripts
│   ├── deploy.ts
│   └── mint.ts
├── test/                  # Smart contract tests
│   └── LearningCertificate.test.ts
├── public/                # Static assets
├── styles/                # CSS files
└── config files           # tsconfig.json, tailwind.config.ts, shadcn.config.ts
```

## Development Commands

Since the package.json appears to be minimal, here are the common commands typically used with this stack:

```bash
# Install dependencies (using pnpm)
pnpm install

# Run the development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Architecture

1. **Dual Interface**:
   - Student view (`/`): View issued certificates
   - Teacher view (`/mint`): Mint/create new certificates

2. **Web3 Integration**:
   - Wallet connection via RainbowKit
   - Ethereum blockchain interaction via Wagmi
   - Smart contract interaction for certificate management

3. **Internationalization**:
   - Multi-language support with language switcher
   - JSON-based translation files

4. **Smart Contract**:
   - LearningCertificate smart contract
   - Deployment and minting scripts
   - Contract testing with Hardhat

## Common Development Tasks

1. **Adding new translations**:
   - Add new language JSON files in `i18n/locales/`
   - Update the i18n configuration in `i18n/index.ts`

2. **Modifying the smart contract**:
   - Update files in the `abi/` directory
   - Update deployment scripts in `scripts/`

3. **Adding new components**:
   - Create new components in the `components/` directory
   - Import and use them in the appropriate pages

4. **Styling**:
   - Use Tailwind CSS classes directly in components
   - Add global styles in `globals.css`
   - Modify Tailwind configuration in `tailwind.config.ts`