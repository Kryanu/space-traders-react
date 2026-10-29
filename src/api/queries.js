import { filterRecordByHandle } from './pocketbase';
import { isMockMode } from './mode';
import { MOCK_TOKEN, setMockAgentSymbol } from '../mocks';

export const retrieveToken = async ({ handleInput, queryClient }) => {
  if (isMockMode()) {
    setMockAgentSymbol(handleInput || 'DEMO');
    queryClient.setQueryData(['token'], {
      items: [{ handle: handleInput || 'DEMO', token: MOCK_TOKEN }],
    });
    return;
  }

  await queryClient.fetchQuery({
    queryKey: ['token'],
    queryFn: async () => {
      return await filterRecordByHandle(handleInput);
    },
    staleTime: Infinity,
  });
};
