import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("BgU2w5QKVjX1Gc4rP4S4sf2hYcYszDssQnHnzYRuxu4e")

// Recipient address
const to = new PublicKey("EuUjJYVmtmCnM3uodKyyn2BePDLExjwtwvcDDRzgLTEr");       

(async () => {try {
    const fromwallet = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey
    );
    const towallet = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        to, 
    );
    const signature = await transfer (
        connection,
        keypair,
        fromwallet.address,
        towallet.address,
        keypair,
        1,
    );
    console.log(`Transaction signature: ${signature}`);

    
} catch(e) {
    console.error(`Oops, something went wrong: ${e}`)
}
})();