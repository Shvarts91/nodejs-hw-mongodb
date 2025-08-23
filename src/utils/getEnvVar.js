import dotenv from 'dotenv';

dotenv.config();

// export const getEnvVar = (key) => {
//   const value = process.env[key];

//   if (value !== undefined) {
//     return value;
//   }

//   throw new Error(`Environment variable ${key} is not defined`);
// };
export const getEnvVar = (key, defaultValue) => {
  const value = process.env[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Environment variable ${key} is not defined`);
};
