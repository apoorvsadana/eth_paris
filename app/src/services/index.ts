import axios from 'axios';

//  make axios post request
export const get = (data: any) => {
  return axios.get(
    `https://7dab-195-10-99-99.ngrok-free.app/txn_hash?amount=${data.amount}&recepient=${data.recepient}`,
  );
};

export const post = (data: any) => {
  return axios.post(
    `https://7dab-195-10-99-99.ngrok-free.app/send?amount=${data.amount}&recepient=${data.recepient}&signature=${data.signature}`,
  );
};
