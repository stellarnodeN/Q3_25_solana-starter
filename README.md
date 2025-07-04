# Q3_25_solana-starter

This project demonstrates how to create and manage Solana SPL tokens and NFT metadata using the Metaplex Token Metadata program and the UMI SDK. The code is written in TypeScript and interacts with the Solana Devnet. It covers all the essential flows for minting tokens, uploading metadata, and handling NFTs using decentralized storage with Irys and Pinata.

---

## Table of Contents

- [File Structure](#file-structure)
- [Overview](#overview)
  - [SPL Token Scripts](#spl-token-scripts)
  - [NFT Scripts](#nft-scripts)
  - [How Irys and Pinata Work](#how-irys-and-pinata-work)
- [How It Works](#how-it-works)
  - [Wallet and UMI Setup](#1-wallet-and-umi-setup)
  - [Mint Address](#2-mint-address)
  - [Creating NFT Metadata](#3-creating-nft-metadata)
  - [IPFS, Pinata, and Gateway](#4-ipfs-pinata-and-gateway)
- [Architecture](#architecture-how-spl-tokens-and-nfts-are-minted)
  - [SPL Token Minting Flow](#spl-token-minting-flow)
  - [NFT Minting Flow](#nft-minting-flow)
  - [Metadata Account Creation (Metaplex)](#metadata-account-creation-metaplex)
- [How to Use](#how-to-use)
- [License](#license)
- [Notes](#notes)
- [References](#references)

---

## File Structure

```
ts/
  cluster1/
    spl_init.ts        # Create a new SPL token mint
    spl_mint.ts        # Mint tokens to your wallet
    spl_transfer.ts    # Transfer SPL tokens to another wallet
    spl_metadata.ts    # Create metadata for an existing mint (Metaplex)
    nft_image.ts       # Upload NFT image to decentralized storage (Irys)
    nft_metadata.ts    # Upload NFT metadata JSON to decentralized storage (Irys)
    nft_mint.ts        # Mint a new NFT using uploaded metadata
    ...
```
## Prerequisites

- Node.js (v18 or higher)
- Yarn or npm
- Solana CLI tools
- A Solana wallet (or generate one using the included tools)
- Devnet SOL (use the airdrop tool included)

---

## Overview

### SPL Token Scripts

- **spl_init.ts**  
  Creates a new SPL token mint on Solana Devnet with your wallet as the mint authority.  
  - Uses `@solana/web3.js` and `@solana/spl-token`.
  - Prints the new mint address.

- **spl_mint.ts**  
  Mints new tokens to your associated token account for a given mint.  
  - Finds or creates your associated token account.
  - Mints a specified amount of tokens to your wallet.

- **spl_transfer.ts**  
  Transfers SPL tokens from your wallet to another address.  
  - Finds/creates associated token accounts for both sender and recipient.
  - Transfers tokens and prints the transaction signature.

- **spl_metadata.ts**  
  Creates a metadata account for an existing mint using Metaplex Token Metadata.  
  - Sets the name, symbol, and metadata URI (hosted on IPFS via Pinata).
  - Uses the Pinata gateway for HTTP access to the metadata.

### NFT Scripts

- **nft_image.ts**  
  Uploads an image (e.g., `generug.png`) to decentralized storage using the Irys uploader.  
  - Reads the image file.
  - Uploads it via Irys and prints the resulting URI.

- **nft_metadata.ts**  
  Uploads NFT metadata JSON to decentralized storage (Irys).  
  - Constructs a metadata object (name, symbol, description, image, attributes).
  - Uploads the JSON and prints the metadata URI.

- **nft_mint.ts**  
  Mints a new NFT using the uploaded metadata.  
  - Uses Metaplex's `createNft` function.
  - Sets the metadata URI, name, symbol, and royalty.
  - Prints the transaction and mint address.

---

### How Irys and Pinata Work

- **Irys**:  
  A decentralized storage uploader used to store images and metadata off-chain. The scripts use the Irys uploader to pin files and metadata, returning a permanent URI (e.g., `https://gateway.irys.xyz/...`).

- **Pinata**:  
  A pinning service for IPFS. When using Pinata, your metadata is uploaded to IPFS and pinned for reliability. The Pinata gateway (`https://gateway.pinata.cloud/ipfs/`) allows HTTP access to your IPFS files.

---

## How It Works

### 1. Wallet and UMI Setup
- Scripts import a wallet keypair from `turbin3-wallet.json`.
- A UMI connection is created to the Solana Devnet.
- The keypair is used to sign transactions.

### 2. Mint Address
- Scripts use a hardcoded mint address for the NFT, or generate a new one for SPL tokens.

### 3. Creating NFT Metadata
- Scripts prepare the required accounts and metadata fields (name, symbol, URI, etc.).
- Use `createMetadataAccountV3` from Metaplex Token Metadata to create the metadata account on-chain.
- The transaction is signed and sent to Solana Devnet.

### 4. IPFS, Pinata, and Gateway
- The `uri` field in the NFT metadata points to an IPFS hash or Irys link, representing the decentralized storage location of the NFT's metadata JSON.
- Pinata is used as a pinning service to ensure the metadata file stays available on IPFS.
- The HTTP gateway allows wallets and dApps to fetch metadata.

---


## Visual Diagrams

### SPL Token Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    SPL Token Ecosystem                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Mint      │    │   Token     │    │   Wallet    │     │
│  │  Account    │◄──►│   Account   │◄──►│   Owner     │     │
│  │             │    │             │    │             │     │
│  │ • Authority │    │ • Balance   │    │ • Keypair   │     │
│  │ • Supply    │    │ • Mint      │    │ • Address   │     │
│  │ • Decimals  │    │ • Owner     │    │ • SOL       │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   spl_init  │    │   spl_mint  │    │ spl_transfer│     │
│  │   Creates   │    │   Mints     │    │   Moves     │     │
│  │   new mint  │    │   tokens    │    │   tokens    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### NFT Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      NFT Ecosystem                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   NFT Mint  │    │  Metadata   │    │   Image     │     │
│  │  Account    │◄──►│   Account   │◄──►│   Storage   │     │
│  │             │    │             │    │             │     │
│  │ • Authority │    │ • Name      │    │ • Irys      │     │
│  │ • Supply=1  │    │ • Symbol    │    │ • IPFS      │     │
│  │ • Metadata  │    │ • URI       │    │ • Gateway   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  nft_mint   │    │nft_metadata │    │  nft_image  │     │
│  │   Creates   │    │   Uploads   │    │   Uploads   │     │
│  │   NFT       │    │   metadata  │    │   image     │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Token vs NFT Comparison

```
┌─────────────────────────────────────────────────────────────┐
│                SPL Token vs NFT Comparison                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐              ┌─────────────────┐      │
│  │   SPL Token     │              │      NFT        │      │
│  ├─────────────────┤              ├─────────────────┤      │
│  │ • Fungible      │              │ • Non-fungible  │      │
│  │ • Divisible     │              │ • Indivisible   │      │
│  │ • Supply > 1    │              │ • Supply = 1    │      │
│  │ • Same value    │              │ • Unique value  │      │
│  │ • No metadata   │              │ • Rich metadata │      │
│  │ • Simple        │              │ • Complex       │      │
│  └─────────────────┘              └─────────────────┘      │
│                                                             │
│  ┌─────────────────┐              ┌─────────────────┐      │
│  │   Use Cases     │              │   Use Cases     │      │
│  ├─────────────────┤              ├─────────────────┤      │
│  │ • Currency      │              │ • Art           │      │
│  │ • Rewards       │              │ • Collectibles  │      │
│  │ • Governance    │              │ • Gaming        │      │
│  │ • Utility       │              │ • Identity      │      │
│  └─────────────────┘              └─────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Storage Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Storage Architecture                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   On-Chain  │    │   Off-Chain │    │   Gateway   │     │
│  │             │    │             │    │             │     │
│  │ • Mint Data │    │ • Images    │    │ • HTTP      │     │
│  │ • Metadata  │    │ • Metadata  │    │ • Access    │     │
│  │ • Accounts  │    │ • JSON      │    │ • Caching   │     │
│  │ • Balances  │    │ • Files     │    │ • CDN       │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Solana    │    │   Irys      │    │   Pinata    │     │
│  │   Blockchain│    │   IPFS      │    │   Gateway   │     │
│  │   Storage   │    │   Storage   │    │   Service   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Transaction Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   Transaction Flow                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Wallet    │    │   Client    │    │   Solana    │     │
│  │             │    │             │    │   Network   │     │
│  │ • Keypair   │───►│ • Script    │───►│ • Validator │     │
│  │ • Sign      │    │ • Build     │    │ • Process   │     │
│  │ • Address   │    │ • Send      │    │ • Confirm   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         ▲                   ▲                   │           │
│         │                   │                   ▼           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Result    │◄───│   Response  │◄───│   Block     │     │
│  │ • Success   │    │ • Signature │    │ • Confirmed │     │
│  │ • Error     │    │ • Status    │    │ • Finalized │     │
│  │ • Balance   │    │ • Details   │    │ • Immutable │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## How to Use

1. Ensure you have a valid Solana wallet keypair in `turbin3-wallet.json`.
2. Install dependencies:
   ```sh
   cd ts
   yarn install
   # If you don't have ts-node installed globally:
   yarn global add ts-node
   ```
3. Run the desired script using `yarn ts-node`:

   - Create a new SPL token mint (prints mint address):
     ```sh
     yarn ts-node cluster1/spl_init.ts
     ```
   - Mint tokens to your wallet (prints associated token account and mint txid):
     ```sh
     yarn ts-node cluster1/spl_mint.ts
     ```
   - Transfer SPL tokens (prints transaction signature):
     ```sh
     yarn ts-node cluster1/spl_transfer.ts
     ```
   - Upload an NFT image to Irys (prints image URI):
     ```sh
     yarn ts-node cluster1/nft_image.ts
     ```
   - Upload NFT metadata to Irys (prints metadata URI):
     ```sh
     yarn ts-node cluster1/nft_metadata.ts
     ```
   - Mint a new NFT (prints transaction and mint address):
     ```sh
     yarn ts-node cluster1/nft_mint.ts
     ```
   - Create metadata for an existing mint (prints transaction signature):
     ```sh
     yarn ts-node cluster1/spl_metadata.ts
     ```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Notes
- The NFT metadata JSON must be uploaded to IPFS (e.g., using Pinata or Irys) and the resulting hash used in the `uri` field.
- The Pinata gateway makes the IPFS content accessible via HTTP.
- The Irys gateway (`https://gateway.irys.xyz/`) is used for files uploaded via Irys.
- All scripts are designed for Solana Devnet (not mainnet) and are intended for educational and testing purposes.

---

## References

- [Solana SPL Token Program](https://spl.solana.com/token)
- [Metaplex Token Metadata](https://docs.metaplex.com/programs/token-metadata/overview)
- [Pinata IPFS Service](https://www.pinata.cloud/)
- [Irys Decentralized Storage](https://irys.xyz/)
- [UMI SDK](https://github.com/metaplex-foundation/umi)


```
