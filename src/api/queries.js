import { filterRecordByHandle } from './pocketbase';

export const retrieveToken = async ({ handleInput, queryClient }) => {
  await queryClient.fetchQuery({
    queryKey: ['token'],
    queryFn: async () => {
      return await filterRecordByHandle(handleInput);
    },
    staleTime: Infinity,
  });
};
