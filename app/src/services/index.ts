import axios from 'axios';

const API_URL =
  'https://f0ed-91-197-136-110.ngrok-free.app/txn_hash?amount=1&recepient=0x123';
//  make axios post request
export const get = (data: any) => {
  console.log(
    `https://f0ed-91-197-136-110.ngrok-free.app/txn_hash?amount=${data.amount}&recepient=${data.recepient}`,
  );
  return axios.get(
    `https://f0ed-91-197-136-110.ngrok-free.app/txn_hash?amount=${data.amount}&recepient=${data.recepient}`,
  );
};

export const post = (data: any) => {
  console.log(
    `https://f0ed-91-197-136-110.ngrok-free.app/send?amount=${data.amount}&recepient=${data.recepient}&signature=${data.signature}`,
  );

  return axios.post(
    `https://f0ed-91-197-136-110.ngrok-free.app/send?amount=${data.amount}&recepient=${data.recepient}&signature=${data.signature}`,
  );
};
