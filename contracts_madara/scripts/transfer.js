const starknet = require("starknet");
const { FEE_TOKEN_ADDRESS } = require("./constants");
const ethers = require("ethers");
require("dotenv").config();

const provider = new starknet.Provider({
  rpc: {
    nodeUrl: "https://d7ff-91-197-136-110.ngrok-free.app",
  },
});

const account = new starknet.Account(
  provider,
  "0x5ef35e6c44ab1a817a84fab798b658efd9680ccf387ff36a446a7b8a46237c7",
  "0x123124", // anything as we will change the signature anyways
  "1"
);

const splitEthSignature = (signature) => {
  if (!ethers.isHexString(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = parseInt(Number(v));
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v,
  };
};

async function transfer() {
  const VERSION = "1";
  const NONCE = await account.getNonce();
  const MAX_FEE = "12345678";
  const CHAIN_ID = "0x534e5f474f45524c49";
  const invoke = await account.buildInvocation(
    [
      {
        contractAddress: FEE_TOKEN_ADDRESS,
        entrypoint: "transfer",
        calldata: ["0x12345", "0xfffffffffffffffffffffffff", "0x0"],
      },
    ],
    {
      maxFee: MAX_FEE,
      walletAddress: account.address,
      chainId: CHAIN_ID,
      cairoVersion: "1",
      version: VERSION,
      nonce: NONCE,
    }
  );
  const txnHash = starknet.hash.calculateTransactionHash(
    account.address,
    VERSION,
    invoke.calldata,
    MAX_FEE,
    CHAIN_ID,
    NONCE
  );

  const etherWallet = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY);
  const signature = etherWallet.signMessageSync(txnHash);
  const splitSignature = splitEthSignature(signature);

  let r_u256 = starknet.uint256.bnToUint256(splitSignature.r);
  let s_u256 = starknet.uint256.bnToUint256(splitSignature.s);

  invoke.signature = [
    r_u256.low,
    r_u256.high,
    s_u256.low,
    s_u256.high,
    splitSignature.v == 28 ? 1 : 0,
  ];

  const invokeTxn = await provider.invokeFunction(invoke, {
    nonce: NONCE,
    maxFee: MAX_FEE,
    version: VERSION,
  });
  console.log("Transaction invoked - ", invokeTxn);
  await provider.waitForTransaction(invokeTxn.transaction_hash);
}

transfer();
