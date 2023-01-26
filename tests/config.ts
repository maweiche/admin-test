import * as anchor from "@project-serum/anchor"
import * as spl from "@solana/spl-token"
import { Program } from "@project-serum/anchor"
import { Config } from "../target/types/config"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
import { assert, expect } from "chai"
import { execSync } from "child_process"
const fs = require("fs")

const deploy = () => {
  const deployCmd = `solana program deploy --url localhost -v --program-id $(pwd)/target/deploy/config-keypair.json $(pwd)/target/deploy/config.so`
  execSync(deployCmd)
}

describe("config", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())
  const connection = anchor.getProvider().connection
  const wallet = anchor.workspace.Config.provider.wallet

  const program = anchor.workspace.Config as Program<Config>
  const programDataAddress = findProgramAddressSync(
    [program.programId.toBytes()],
    new anchor.web3.PublicKey("BPFLoaderUpgradeab1e11111111111111111111111")
  )[0]

  const adminConfig = findProgramAddressSync(
    [Buffer.from("admin")],
    program.programId
  )[0]

  const tokenAccount = anchor.web3.Keypair.generate()

  const sender = anchor.web3.Keypair.generate()
  const receiver = anchor.web3.Keypair.generate()

  let mint: anchor.web3.PublicKey
  let feeDestination: anchor.web3.PublicKey
  let senderTokenAccount: anchor.web3.PublicKey
  let receiverTokenAccount: anchor.web3.PublicKey

  before(async () => {
    let rawdata = fs.readFileSync(
      "tests/keys/test-WaoKNLQVDyBx388CfjaVeyNbs3MT2mPgAhoCfXyUvg8.json"
    )
    let keyData = JSON.parse(rawdata)
    let key = anchor.web3.Keypair.fromSecretKey(new Uint8Array(keyData))

    mint = await spl.createMint(
      connection,
      wallet.payer,
      wallet.publicKey,
      null,
      0,
      key
    )

    feeDestination = await spl.createAccount(
      connection,
      wallet.payer,
      mint,
      wallet.publicKey
    )

    senderTokenAccount = await spl.createAccount(
      connection,
      wallet.payer,
      mint,
      sender.publicKey
    )

    receiverTokenAccount = await spl.createAccount(
      connection,
      wallet.payer,
      mint,
      receiver.publicKey
    )

    await spl.mintTo(
      connection,
      wallet.payer,
      mint,
      senderTokenAccount,
      wallet.payer,
      10000
    )

    await connection.confirmTransaction(
      await connection.requestAirdrop(
        sender.publicKey,
        1 * anchor.web3.LAMPORTS_PER_SOL
      ),
      "confirmed"
    )

    deploy()
  })

  it("Initialize Admin", async () => {

  })

  it("Payment", async () => {

  })

  it("Update Admin Config", async () => {

  })

  it("Update Admin Config - expect fail", async () => {
    
  })
})
