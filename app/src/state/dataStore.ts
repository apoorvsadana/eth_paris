// import createStore from 'zustand/vanilla';

// import createSelectors from './selector';

// interface BearState {
//   userAddress: string;
//   setUserAddress: (address: string) => void;
//   recepientAddress: string;
//   setRecepientAddress: (address: string) => void;
//   transferAmount: number;
//   setTransferAmount: (amount: number) => void;
//   userSignature: string;
//   setUserSignature: (signature: string) => void;
//   transactionHash: string;
//   setTransactionHash: (hash: string) => void;
// }

// const useStoreBase = createStore<BearState>()(set => ({
//   userAddress: '',
//   setUserAddress: address =>
//     set(state => ({userAddress: (state.userAddress = address)})),
//   recepientAddress: '',
//   setRecepientAddress: address =>
//     set(state => ({recepientAddress: (state.recepientAddress = address)})),
//   transferAmount: 0,
//   setTransferAmount: amount =>
//     set(state => ({transferAmount: (state.transferAmount = amount)})),
//   userSignature: '',
//   setUserSignature: signature =>
//     set(state => ({userSignature: (state.userSignature = signature)})),
//   transactionHash: '',
//   setTransactionHash: hash =>
//     set(state => ({transactionHash: (state.transactionHash = hash)})),
// }));

// export default createSelectors(useStoreBase);

import {createStore} from 'zustand/vanilla';
import createBoundedUseStore from './selector';

// type StoreType = {
//   userAddress: string;
//   recepientAddress: string;
//   transferAmount: number;
//   userSignature: string;
//   transactionHash: string;
// };

// type Action = {
//   setUserAddress: (address: State['userAddress']) => void;
//   setRecepientAddress: (address: State['recepientAddress']) => void;
//   setTransferAmount: (amount: State['transferAmount']) => void;
//   setUserSignature: (signature: State['userSignature']) => void;
//   setTransactionHash: (hash: State['transactionHash']) => void;
// };

interface BearState {
  userAddress: string;
  setUserAddress: (address: string) => void;
  recepientAddress: string;
  setRecepientAddress: (address: string) => void;
  transferAmount: number;
  setTransferAmount: (amount: number) => void;
  userSignature: string;
  setUserSignature: (signature: string) => void;
  transactionHash: string;
  setTransactionHash: (hash: string) => void;
}
// using createStore from zustand/vanilla instead of store because we want to use this state outside of react components
export const dataStore = createStore<BearState>()(set => ({
  userAddress: '',
  recepientAddress: '',
  transferAmount: 0,
  userSignature: '',
  transactionHash: '',

  setUserAddress: address =>
    set(state => ({userAddress: (state.userAddress = address)})),
  setRecepientAddress: address =>
    set(state => ({recepientAddress: (state.recepientAddress = address)})),
  setTransferAmount: address =>
    set(state => ({transferAmount: (state.transferAmount = address)})),
  setUserSignature: address =>
    set(state => ({userSignature: (state.userSignature = address)})),
  setTransactionHash: address =>
    set(state => ({transactionHash: (state.transactionHash = address)})),
}));

// Create a hook to be used inside react components
const useDataStore = createBoundedUseStore(dataStore);

export default useDataStore;
