# Solana SPL & NFT Metadata Example

This project demonstrates how to create and manage Solana SPL tokens and NFT metadata using the Metaplex Token Metadata program and the UMI SDK. The code is written in TypeScript and interacts with the Solana Devnet.


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

### SPL Token Overview

- **spl_init.ts**  
  Creates a new SPL token mint on Solana Devnet using your wallet as the mint authority.  
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
  - Uses the Pinata gateway to make the metadata accessible via HTTP.

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
  - Uses Metaplex’s `createNft` function.
  - Sets the metadata URI, name, symbol, and royalty.
  - Prints the transaction and mint address.

---

### How Irys and Pinata Work

- **Irys**:  
  A decentralized storage uploader used to store images and metadata off-chain. The scripts use the Irys uploader to pin files and metadata, returning a permanent URI (e.g., `https://gateway.irys.xyz/...`).

- **Pinata**:  
  A pinning service for IPFS. When using Pinata, your metadata is uploaded to IPFS and pinned for reliability. The Pinata gateway (`https://gateway.pinata.cloud/ipfs/`) allows HTTP access to your IPFS-hosted metadata, which is required by wallets and dApps.

---

## How It Works

### 1. Wallet and UMI Setup
- The script imports a wallet keypair from `turbin3-wallet.json`.
- It creates a UMI connection to the Solana Devnet.
- The keypair is used to sign transactions.

### 2. Mint Address
- The script uses a hardcoded mint address for the NFT.

### 3. Creating NFT Metadata
- The script prepares the required accounts and metadata fields (name, symbol, URI, etc.).
- It uses the `createMetadataAccountV3` function from the Metaplex Token Metadata library to create the metadata account on-chain.
- The transaction is signed and sent to the network.

### 4. IPFS, Pinata, and Gateway
- The `uri` field in the metadata points to an IPFS hash, which is a decentralized storage location for the NFT's metadata JSON.
- Pinata is used as a pinning service to ensure the metadata file stays available on IPFS.
- The URI uses the Pinata gateway (`https://gateway.pinata.cloud/ipfs/`) to fetch the metadata via HTTP, making it accessible to wallets and dApps.

## Architecture: How SPL Tokens and NFTs Are Minted

Below are simplified diagrams and explanations for the minting process of SPL tokens and NFTs in this project.

### SPL Token Minting Flow

```mermaid
flowchart TD
    A[Start: Wallet Keypair] --> B[Connect to Solana Devnet]
    B --> C[Create Mint (spl_init.ts)]
    C --> D[Get/Create Associated Token Account (spl_mint.ts)]
    D --> E[Mint Tokens to Account]
    E --> F[Transfer Tokens (spl_transfer.ts)]
```

- **spl_init.ts**: Creates a new token mint.
- **spl_mint.ts**: Mints tokens to your wallet's associated token account.
- **spl_transfer.ts**: Transfers tokens to another wallet.

### NFT Minting Flow

```mermaid
flowchart TD
    A1[Start: Wallet Keypair] --> B1[Connect to Solana Devnet]
    B1 --> C1[Upload Image (nft_image.ts)]
    C1 --> D1[Get Image URI]
    D1 --> E1[Create Metadata JSON (nft_metadata.ts)]
    E1 --> F1[Upload Metadata JSON]
    F1 --> G1[Get Metadata URI]
    G1 --> H1[Mint NFT (nft_mint.ts)]
    H1 --> I1[NFT Created on Solana]
```

- **nft_image.ts**: Uploads the NFT image to decentralized storage (Irys).
- **nft_metadata.ts**: Uploads the NFT metadata JSON referencing the image URI.
- **nft_mint.ts**: Mints the NFT using the metadata URI.

### Metadata Account Creation (Metaplex)

```mermaid
flowchart TD
    X[Existing Mint Address] --> Y[Create Metadata Account (spl_metadata.ts)]
    Y --> Z[Metadata on Solana (Metaplex)]
```

- **spl_metadata.ts**: Creates a metadata account for an existing mint using Metaplex Token Metadata.

---

For more details, see the code comments and script explanations above.

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

   - To create a new SPL token mint (prints mint address):
     ```sh
     yarn ts-node cluster1/spl_init.ts
     ```
   - To mint tokens to your wallet (prints associated token account and mint txid):
     ```sh
     yarn ts-node cluster1/spl_mint.ts
     ```
   - To transfer SPL tokens (prints transaction signature):
     ```sh
     yarn ts-node cluster1/spl_transfer.ts
     ```
   - To upload an NFT image to Irys (prints image URI):
     ```sh
     yarn ts-node cluster1/nft_image.ts
     ```
   - To upload NFT metadata to Irys (prints metadata URI):
     ```sh
     yarn ts-node cluster1/nft_metadata.ts
     ```
   - To mint a new NFT (prints transaction and mint address):
     ```sh
     yarn ts-node cluster1/nft_mint.ts
     ```
   - To create metadata for an existing mint (prints transaction signature):
     ```sh
     yarn ts-node cluster1/spl_metadata.ts
     ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Notes
- The NFT metadata JSON must be uploaded to IPFS (e.g., using Pinata or Irys) and the resulting hash used in the `uri` field.
- The Pinata gateway makes the IPFS content accessible via HTTP.
- The Irys gateway (`https://gateway.irys.xyz/`) is used for files uploaded via Irys.


## References
- [Solana SPL Token Program](https://spl.solana.com/token)
- [Metaplex Token Metadata](https://docs.metaplex.com/programs/token-metadata/overview)
- [Pinata IPFS Service](https://www.pinata.cloud/)
- [Irys Decentralized Storage](https://irys.xyz/)
- [UMI SDK](https://github.com/metaplex-foundation/umi)
