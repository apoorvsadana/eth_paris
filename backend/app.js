const express = require("express");
const app = express();
const port = 3000;
const starknet = require("starknet");
const ethers = require("ethers");

FEE_TOKEN_ADDRESS =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

const provider = new starknet.Provider({
  rpc: {
    nodeUrl:
      "https://starknet-goerli.infura.io/v3/c3ecec3338dd405ca1a0ba9efbcf59ee",
  },
});

const account = new starknet.Account(
  provider,
  "0x06074e06efcedd49fbfd7f96f6753c1aa2fc917964fe941e01ae4ef1939f85c1",
  "0x123124", // anything as we will change the signature anyways
  "1"
);

app.get("/txn_hash", async (req, res) => {
  const VERSION = "1";
  const NONCE = await account.getNonce();
  const MAX_FEE = "1234567812231241231231231";
  const CHAIN_ID = "0x534e5f474f45524c49";
  const invoke = await account.buildInvocation(
    [
      {
        contractAddress: FEE_TOKEN_ADDRESS,
        entrypoint: "transfer",
        calldata: [req.query.recepient, req.query.amount, "0x0"],
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
  res.send({ txnHash });
});

app.post("/send", async (req, res) => {
  const VERSION = "1";
  const NONCE = await account.getNonce();
  const MAX_FEE = "1234567812231241231231231";
  const CHAIN_ID = "0x534e5f474f45524c49";
  const invoke = await account.buildInvocation(
    [
      {
        contractAddress: FEE_TOKEN_ADDRESS,
        entrypoint: "transfer",
        calldata: [req.query.recepient, req.query.amount, "0x0"],
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

  const splitSignature = splitEthSignature(req.query.signature);
  console.log(splitSignature);

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
  res.send({ txnHash });
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
