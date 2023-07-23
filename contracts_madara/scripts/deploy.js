const starknet = require("starknet");
const accountSierra = require("../sierra.json");
const accountCasm = require("../casm.json");
const { FEE_TOKEN_ADDRESS } = require("./constants");

const provider = new starknet.Provider({
  rpc: {
    nodeUrl: "https://d7ff-91-197-136-110.ngrok-free.app",
  },
});

const account = new starknet.Account(
  provider,
  "0x2",
  "0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d",
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
    let declareTxn = await account.declare(
      {
        contract: accountSierra,
        casm: accountCasm,
      },
      { maxFee: "12345678" }
    );
    // await provider.waitForTransaction(declareTxn.transaction_hash);
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
  const transferTxn = await account.execute(
    {
      contractAddress: FEE_TOKEN_ADDRESS,
      entrypoint: "transfer",
      calldata: [accountAddress, "0xfffffffffffffffffffffffff", "0x0"],
    },
    undefined,
    {
      maxFee: "12345678",
    }
  );
  // await provider.waitForTransaction(transferTxn.transaction_hash);
  console.log("Transferred funds - ", transferTxn);

  const deployTxn = await ethAccount.deploySelf(
    {
      classHash: classHash,
      addressSalt: SALT,
      constructorCalldata: CONSTRUCTOR_CALLDATA,
    },
    { maxFee: "12345678" }
  );
  // await provider.waitForTransaction(deployTxn.transaction_hash);
  console.log(deployTxn);
}

declareAccount();
