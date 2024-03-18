export const toToken = (queryClient) => {
  const token = queryClient.getQueryData(['token']);
  return token.items[0].token;
};
