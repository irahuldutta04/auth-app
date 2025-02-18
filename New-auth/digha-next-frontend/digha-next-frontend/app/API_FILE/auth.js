import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const register = async (data) => {
  const response = await axios.post(
    `${baseURL}/api/devotee/devotee-register`,
    data
  );
  return response;
};


export const login = async (data) => {
  const response = await axios.post(
    `${baseURL}/api/devotee/devotee-login`,
    data
  );
  return response;
};


// export const verifyOTP = async (data) => {
//   const response = await axios.post(
//     `${baseURL}/api/devotee/verify-otp`,
//     data
//   );
//   return response;
// };

export const verifyOTP = async (data) => {
  const response = await axios.post(
    `${baseURL}/api/devotee/verify-otp`,
    data
  );
  return response;
};
