export const withPrefix = (key: string) => {
  if (process.env.NODE_ENV === 'production') {
    return key;
  }
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV + ':' + key;  
  }
  return key;
};
