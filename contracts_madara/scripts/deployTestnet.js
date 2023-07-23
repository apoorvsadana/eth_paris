const starknet = require("starknet");
const accountSierra = require("../sierra.json");
const accountCasm = require("../casm.json");
const { FEE_TOKEN_ADDRESS } = require("./constants");

const provider = new starknet.Provider({
  sequencer: {
    network: "SN_GOERLI",
    chainId: "0x534e5f474f45524c49",
  },
});

const account = new starknet.Account(
  provider,
  "0x03eEd0103d0C25EE8F8B7a6BF01CC21dc1543eC9EbbE01b14Df087D42E0c8E3f",
  "0x04ac7371ba593eddb3eab929a29a1a63b8bcd96c0ea532912f60ebd69399a2f9",
  "0"
);
const SALT =
  "0x0000000000000000000000000000000000000000000000000000000000001111";

async function declareAccount() {
  const classHash = starknet.hash.computeContractClassHash(accountSierra);
  try {
    await provider.getClassByHash(classHash);
    console.log("Already declared at - ", classHash);
  } catch (err) {
    let declareTxn = await account.declare({
      contract: accountSierra,
      casm: accountCasm,
    });
    await provider.waitForTransaction(declareTxn.transaction_hash);
    console.log("Declared contract - ", declareTxn);
  }

  const CONSTRUCTOR_CALLDATA = ["0x93EC21b173d25CEd8777d8D9b2DF9bbc55071D6d"];
  const accountAddress = starknet.hash.calculateContractAddressFromHash(
    SALT,
    classHash,
    CONSTRUCTOR_CALLDATA,
    0
  );

  const ethAccount = new starknet.Account(
    provider,
    accountAddress,
    "0x123456",
    "1"
  );

  // get funds for deploy
  const transferTxn = await account.execute({
    contractAddress: FEE_TOKEN_ADDRESS,
    entrypoint: "transfer",
    calldata: [accountAddress, "1000000000", "0x0"],
  });
  await provider.waitForTransaction(transferTxn.transaction_hash);
  console.log("Transferred funds - ", transferTxn);

  const deployTxn = await ethAccount.deploySelf({
    classHash: classHash,
    addressSalt: SALT,
    constructorCalldata: CONSTRUCTOR_CALLDATA,
  });
  await provider.waitForTransaction(deployTxn.transaction_hash);
  console.log(deployTxn);
}

declareAccount();
