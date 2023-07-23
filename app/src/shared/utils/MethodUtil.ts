import {utf8ToHex} from '@walletconnect/encoding';
import {recoverAddress} from '@ethersproject/transactions';
import {hashMessage} from '@ethersproject/hash';
import type {Bytes, SignatureLike} from '@ethersproject/bytes';
import type {FormattedRpcResponse, RpcRequestParams} from '../../types/methods';

export function verifyMessage(
  message: Bytes | string,
  signature: SignatureLike,
): string {
  return recoverAddress(hashMessage(message), signature);
}

const verifyEip155MessageSignature = (
  message: string,
  signature: string,
  address: string,
) => verifyMessage(message, signature).toLowerCase() === address.toLowerCase();

export const signMessage = async ({
  web3Provider,
  message,
}: RpcRequestParams): Promise<FormattedRpcResponse> => {
  if (!web3Provider) {
    throw new Error('web3Provider not connected');
  }
  const hexMsg = utf8ToHex(message, true);
  const [address] = await web3Provider.listAccounts();
  if (!address) {
    throw new Error('No address found');
  }
  const signature = await web3Provider.send('personal_sign', [hexMsg, address]);
  const valid = verifyEip155MessageSignature(message, signature, address);
  return {
    address,
    valid,
    result: signature,
  };
};
